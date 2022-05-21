import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateInternalServerError,
    generateNotFoundError,
    generateSuccessResponse,
} from 'src/utils';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/schemas/project.schema';
import { ActorComplexity } from '../project/subschemas/actor';
import { UseCaseComplexity } from '../project/subschemas/usecase';
import { Estimation, EstimationTypeEnum } from './estimation.schema';
import { Repo } from './repo.schema';
import mongoose from 'mongoose';

const PROD_FACTOR = 20;
interface UAWType {
    SA: number;
    AA: number;
    CA: number;
}

interface UUCWType {
    SUC: number;
    AUC: number;
    CUC: number;
}

const calculateUAW = (record: UAWType): number => {
    return record.SA * 1 + record.AA * 2 + record.CA * 3;
};

const calculateUUCW = (record: UUCWType): number => {
    return record.SUC * 5 + record.AUC * 10 + record.CUC * 15;
};

const dbItemToArray = (record: Repo): number[] => {
    const uaw = calculateUAW(record);
    const uucw = calculateUUCW(record);

    return [
        Number(record.SA),
        Number(record.AA),
        Number(record.CA),
        Number(uaw),
        Number(record.SUC),
        Number(record.AUC),
        Number(record.CUC),
        Number(uucw),
        Number(record.TCF),
        Number(record.ECF),
    ];
};

const projectToRepoItem = (project: Project): Repo => {
    let SA = 0,
        AA = 0,
        CA = 0;

    let SUC = 0,
        AUC = 0,
        CUC = 0;

    project.actors.forEach((actor) => {
        if (actor.complexity === ActorComplexity.Average) AA += 1;
        else if (actor.complexity === ActorComplexity.Complex) CA += 1;
        else SA += 1;
    });

    project.useCases.forEach((useCase) => {
        if (useCase.complexity === UseCaseComplexity.Average) AUC += 1;
        else if (useCase.complexity === UseCaseComplexity.Complex) CUC += 1;
        else SUC += 1;
    });

    const UAW = calculateUAW({ SA, AA, CA });
    const UUCW = calculateUUCW({ SUC, AUC, CUC });

    return {
        SA,
        AA,
        CA,
        UAW,
        SUC,
        AUC,
        CUC,
        UUCW,
        TCF: project.tcf,
        ECF: project.ecf,
    } as Repo;
};

const euclideanDistance = (a: number[], b: number[]): number => {
    if (a.length !== b.length) throw new Error('Array length mismatch');

    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += Math.pow(a[i] - b[i], 2);
    }

    return sum;
};

const manhattanDistance = (a: number[], b: number[]): number => {
    if (a.length !== b.length) throw new Error('Array length mismatch');

    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += Math.abs(a[i] - b[i]);
    }

    return sum;
};

const getNearestNeighbor = (
    k = 2,
    target: number[],
    datapoints: number[][],
) => {
    const distances = datapoints.map((datapoint, index) => ({
        distances: manhattanDistance(datapoint, target),
        index,
    }));

    distances.sort((a, b) => a.distances - b.distances);

    let average = 0;
    for (let i = 0; i < k; i++) {
        average += distances[i].distances;
    }

    // return distances.slice(0, k);
    return average;
};

@Injectable()
export class MLService {
    constructor(
        @InjectModel(Estimation.name)
        private readonly estimationModel: Model<Estimation>,

        @InjectModel(Repo.name)
        private readonly repoModel: Model<Repo>,

        private readonly projectService: ProjectService,
    ) {}

    async predict(projectID: string) {
        try {
            const project = await this.projectService.findById(projectID);

            if (!project) {
                return generateNotFoundError(
                    'Project not found with id: ' + projectID,
                );
            }

            const repo = await this.repoModel.find().lean();

            if (!repo.length) {
                return generateNotFoundError('Repo is not populated yet');
            }

            const parsedProjects = repo.map((e) => dbItemToArray(e));
            const target = dbItemToArray(projectToRepoItem(project));

            const prediction =
                getNearestNeighbor(2, target, parsedProjects) * PROD_FACTOR;

            const estimation: Estimation = await this.estimationModel.create({
                // value: repo[prediction].Effort,
                value: prediction,
                projectID,
                estimationType: EstimationTypeEnum.ML,
            });

            return generateSuccessResponse(estimation);
        } catch (error) {
            console.log(error);

            return generateInternalServerError(error);
        }
    }

    async UCP(projectID: string) {
        try {
            const project = await this.projectService.findById(projectID);
            if (!project) {
                return generateNotFoundError(
                    'Project not found with id: ' + projectID,
                );
            }

            const uaw = calculateUAW(projectToRepoItem(project));
            const uucw = calculateUUCW(projectToRepoItem(project));

            const UUCP = uaw + uucw;

            const UCP = UUCP * project.tcf * project.ecf;

            const effort = UCP * PROD_FACTOR;

            const estimation = await this.estimationModel.create({
                value: effort,
                projectID,
                estimationType: EstimationTypeEnum.UCP,
            });

            return generateSuccessResponse(estimation);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async projectEstimations(projectID: string, estimationType: string) {
        try {
            const estimations = await this.estimationModel.find({
                projectID: new mongoose.Types.ObjectId(projectID),
                estimationType,
            });

            return generateSuccessResponse(estimations);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}

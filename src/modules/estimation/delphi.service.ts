import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateNotFoundError,
    generateResponse,
    generateSuccessResponse,
} from 'src/utils';
import { DelphiRound } from './delphiRound.schema';
import { AddContributionDTO, CreateDelphiRoundDTO } from './estimation.dto';
import mongoose from 'mongoose';

@Injectable()
export class DelphiService {
    constructor(
        @InjectModel(DelphiRound.name)
        private readonly delphiModel: Model<DelphiRound>,
    ) {}

    async findOne(id: string) {
        try {
            const data = await this.delphiModel
                .findById(id)
                .populate('contributions.userID');
            return generateSuccessResponse(data);
        } catch (error) {
            console.log(error);

            return generateInternalServerError(error);
        }
    }

    async findByProjectId(projectId: string) {
        try {
            const data = await this.delphiModel
                .find({ projectId })
                .sort({ createdAt: 1 });
            return generateSuccessResponse(data);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async createOne(body: CreateDelphiRoundDTO) {
        try {
            const previousRound = await this.delphiModel
                .find({
                    projectId: body.projectID,
                })
                .sort({ createdAt: -1 });

            if (previousRound.length && !previousRound[0].hasEnded) {
                return generateResponse(
                    true,
                    HttpStatus.BAD_REQUEST,
                    'Previous round has not ended',
                    null,
                );
            }

            const data = await this.delphiModel.create(body);
            return generateSuccessResponse(data, HttpStatus.CREATED);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async addContribution(
        info: AddContributionDTO,
        roundID: string,
        userID: string,
    ) {
        try {
            const round: DelphiRound = await this.delphiModel.findById(roundID);

            if (!round) {
                return generateNotFoundError();
            }

            if (round.hasEnded) {
                return generateAlreadyExistError('Round has ended');
            }

            const index = round.contributions.findIndex((e) => {
                const stringID = new mongoose.Types.ObjectId(e.userID);

                return stringID.toString() === userID;
            });

            if (index > -1) {
                return generateAlreadyExistError(
                    'You have already contributed',
                );
            }

            const newContribution = {
                userID,
                message: info.message,
                value: info.value,
            };

            const updatedRound = await this.delphiModel.findByIdAndUpdate(
                roundID,
                {
                    $push: {
                        contributions: newContribution,
                    },
                },
                { new: true },
            );

            return generateSuccessResponse(updatedRound);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async endRound(id: string) {
        try {
            const round: DelphiRound = await this.delphiModel.findById(id);

            if (!round) {
                return generateNotFoundError();
            }

            if (round.hasEnded) {
                return generateResponse(
                    true,
                    HttpStatus.CONFLICT,
                    'Round has already ended',
                    null,
                );
            }

            // if (round.contributions.length === 0) {
            //     return generateResponse(
            //         true,
            //         HttpStatus.BAD_REQUEST,
            //         'Atleast one contribution is required',
            //         null,
            //     );
            // }

            const updatedRound = await this.delphiModel.findByIdAndUpdate(
                id,
                {
                    hasEnded: true,
                },
                { new: true },
            );

            return generateSuccessResponse(updatedRound);
        } catch (error) {
            console.log(error);

            return generateInternalServerError(error);
        }
    }
}

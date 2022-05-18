import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateNotFoundError,
    generateSuccessResponse,
} from 'src/utils';
import { DelphiRound } from './delphiRound.schema';
import { CreateDelphiRoundDTO } from './estimation.dto';
import mongoose from 'mongoose';

@Injectable()
export class DelphiService {
    constructor(
        @InjectModel(DelphiRound.name)
        private readonly delphiModel: Model<DelphiRound>,
    ) {}

    async findByProjectId(projectId: string) {
        try {
            const data = await this.delphiModel.findOne({ projectId });
            return generateSuccessResponse(data);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async createOne(body: CreateDelphiRoundDTO) {
        try {
            const data = await this.delphiModel.create(body);
            return generateSuccessResponse(data, HttpStatus.CREATED);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async addContribution(info: {
        userID: string;
        value: number;
        roundID: string;
    }) {
        try {
            const round: DelphiRound = await this.delphiModel.findById(
                info.roundID,
            );

            if (!round) {
                return generateNotFoundError();
            }

            if (round.hasEnded) {
                return generateAlreadyExistError('Round has ended');
            }

            const index = round.contributions.findIndex((e) => {
                const stringID = new mongoose.Types.ObjectId(e.userID);

                return stringID.toString() === info.userID;
            });

            if (index > -1) {
                return generateAlreadyExistError(
                    'User has already contributed',
                );
            }

            // append info to round's contibutions
            const updatedRound = await this.delphiModel.findByIdAndUpdate(
                info.roundID,
                {
                    $push: {
                        contributions: info,
                    },
                },
                { new: true },
            );

            return generateSuccessResponse(updatedRound);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}

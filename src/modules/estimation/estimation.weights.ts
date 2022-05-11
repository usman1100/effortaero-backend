export const TechnicalFactorsWeights = {
    distributed: 2,
    performance: 1,
    processing: 1,
    portable: 2,
};

export const EnvironmentalFactorsWeights = {
    stable: 2,
    language: 2,
    parttime: -1,
    experience: 0.5,
};

export const caluclateTCF = (tfactors: any): number => {
    let sum = 0;
    for (const [key, value] of Object.entries(tfactors)) {
        sum += Number(value) * TechnicalFactorsWeights[key];
    }

    return 0.6 + 0.01 * sum;
};

export const caluclateECF = (efactors: any): number => {
    let sum = 0;
    for (const [key, value] of Object.entries(efactors)) {
        sum += Number(value) * EnvironmentalFactorsWeights[key];
    }
    return 1.4 + -0.03 * sum;
};

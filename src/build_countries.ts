/**
 * This file is used to preprocess countries to add population and linear gradients
 */

import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const getColors = require('get-svg-colors');
const gradstop = require('gradstop');

const fsPromises = fs.promises;

async function buildLinearGradients(src: string): Promise<string> {
    const res: AxiosResponse<string> = await axios.get(src);
    const colors: Array<string> = getColors(res.data).fills.map((color: any) =>
        color.hex()
    );
    const uniqueColors: Array<string> = Array.from(new Set(colors));
    const DEFAULT_STOPS: number = 10;
    const MAXIMUM_SUPPORT_COLOR_ARRAY: number = 4; // according to the documentation https://github.com/Siddharth11/gradstop
    const gradients: Array<string> = [];
    /**
     * As the gradStop lib only support maximum 4 elements in colorArray
     * The logic below is to ensure that it can extract all colors and
     * generate the linear gradient from them respectively
     */
    if (uniqueColors.length > MAXIMUM_SUPPORT_COLOR_ARRAY) {
        const OFFSET: number = Math.ceil(DEFAULT_STOPS / MAXIMUM_SUPPORT_COLOR_ARRAY);
        let endIndex: number = 0;
        while (endIndex < uniqueColors.length) {
            const startIndex: number = endIndex;
            endIndex+=OFFSET;
            if (uniqueColors.slice(endIndex).length <= 1) {
                endIndex++;
            }
            const colorArray: Array<string> = uniqueColors.slice(startIndex, endIndex);
            gradients.push(...gradstop({
                stops: DEFAULT_STOPS,
                inputFormat: 'hex',
                colorArray
            }));
        }
    } else {
        /**
         * If getColors() can only detect 1 color, add the default #34D399 color additionally by default
         */
        if (uniqueColors.length === 1) {
            uniqueColors.push('#34D399');
        }
        gradients.push(...gradstop({
            stops: DEFAULT_STOPS,
            inputFormat: 'hex',
            colorArray: uniqueColors
        }));
    }
    const uniqueGradients: Array<string> = Array.from(new Set(gradients));
    return uniqueGradients.join(',');
}

// (async () => {
//     const data: any = await buildLinearGradients(
//         'https://restcountries.eu/data/grc.svg'
//     );
//     console.log(data);
// })();

(async () => {
    try {
        const folder: string = path.join(__dirname, './data');
        if (fs.existsSync(folder) === false) {
            await fsPromises.mkdir(folder);
        }
        const countries: AxiosResponse<
            Array<Record<string, any>>
        > = await axios.get('https://restcountries.eu/rest/v2/all');
        const populationHistory: AxiosResponse<
            Array<Record<string, any>>
        > = await axios.get(
            'https://pkgstore.datahub.io/core/population/population_json/data/315178266aa86b71057e993f98faf886/population_json.json'
        );
        const finalCountries: Array<Record<string, any>> = countries.data.map(
            async (country: Record<string, any>) => {
                country.linearGradients = await buildLinearGradients(country.flag);

                const index: number = populationHistory.data.findIndex(
                    (value: Record<string, any>) =>
                        value['Country Code'] === country.alpha3Code
                );
                let currentIndex: number = index;
                country.populationHistory = {
                    years: [],
                    population: [],
                } as Record<string, Array<string | number>>;
                while (
                    populationHistory.data[currentIndex] !== undefined &&
                    populationHistory.data[currentIndex]['Country Code'] ===
                        country.alpha3Code
                ) {
                    country.populationHistory.years.push(
                        populationHistory.data[currentIndex]['Year']
                    );
                    country.populationHistory.population.push(
                        populationHistory.data[currentIndex]['Value']
                    );
                    currentIndex++;
                }
                return country;
            }
        );
        const content: string = `export default ${JSON.stringify(
            await Promise.all(finalCountries),
            null,
            4
        )}`;
        await fsPromises.writeFile(
            path.join(`${folder}/countries.ts`),
            content
        );
    } catch (error) {
        console.error(error);
    }
})();

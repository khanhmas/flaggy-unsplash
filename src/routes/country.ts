import { NextFunction, Request, Response, Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';
import countries from './../data/countries';

const fsPromises = fs.promises;
const router: Router = Router();

router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const folder: string = path.join(__dirname, './../data');
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
            const finalCountries: Array<
                Record<string, any>
            > = countries.data.map((country: Record<string, any>) => {
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
                        populationHistory.data[currentIndex]['Value'].toLocaleString()
                    );
                    currentIndex++;
                }
                return country;
            });
            await fsPromises.writeFile(
                path.join(`${folder}/countries.json`),
                JSON.stringify(finalCountries, null, 4)
            );
            res.status(200).send(finalCountries);
        } catch (error) {
            console.error(error);
        }
    }
);


router.get(
    '/all',
    (req: Request, res: Response, next: NextFunction): void => {
        res.status(200).send(countries);
    }
);

export default router;

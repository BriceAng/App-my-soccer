import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'
import { citiesOption } from '../../docs/citiesData';


const filterCities = (inputValue: string) => {
    return citiesOption.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = inputValue =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterCities(inputValue));
        }, 1000);
    });

export default class WithPromises extends Component {
    render() {
        return (
            <AsyncSelect 
            cacheOptions 
            defaultOptions 
            loadOptions={promiseOptions} 
            getOptionLabel

            />
        );
    }
}




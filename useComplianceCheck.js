import React from 'react';

export default function useComplianceCheck(data) {

    const storeRef = React.useRef()
    const [indexElement, setIndexElement] = React.useState([])
    const [Error, setError] = React.useState(false)

    // ! Each element in the array must have an ID

    React.useEffect(() => {
        if (data) {
            storeRef.current = {
                data: data,
                keys: Object.keys(data),
                firstArray: [],
                secondArray: [],
            }
        }
    }, [data])
    
    const start = React.useCallback(() => {
        convertData()
    }, [])

    const convertData = () => {
        if(typeof storeRef.current.data == undefined) { setError('Error: data = undefined'); return false }

        storeRef.current.data[storeRef.current.keys[1]].forEach(element => storeRef.current.firstArray.push(Number(element.id)))
        storeRef.current.data[storeRef.current.keys[0]].forEach(element => storeRef.current.secondArray.push(Number(element.id)))

        if (storeRef.current.firstArray.length !== 0) {
            check(storeRef.current.firstArray, storeRef.current.secondArray)
        } else setError('Error: firstArray empty')
    }

    const check = (firstArray, secondArray) => {
        let index = 0
        const indexMatching = []

        for (index; index < firstArray.length; index++) {
            let Matching = secondArray.some((element) => element === firstArray[index])
            if (Matching) indexMatching.push(index)

            // The loop goes through the entire first array, 
            // and if there is a match with the second array, 
            // it returns "true" and adds the index of the matched element to indexMatching
        }

        if (indexMatching !== []) setIndexElement(indexMatching)
        else setError('There was an error in the comparison')
    }

    return [start, indexElement, Error];
}

// const [start, indexElement, Error] = useComplianceCheck(data)
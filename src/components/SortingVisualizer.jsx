import React, { useState } from 'react'
import VisualizerBars from './VisualizerBars.jsx';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]); // for array update or create karne ke liye 
    const [isSorting, setIsSorting] = useState(false);   // use taki button ko disable kar sakun at the time of sorting 
    const [isComparing, setIsComparing] = useState([]); // ye kin index ko compare kar raha hun unko select kar ke different color dene ke liye
    const [sorted, setSorted] = useState([]) // ye finally jitna sorted ho gya hai us index ko select kar ke different color dene ke liye 
    const [pivotIndex, setPivotIndex] = useState(null);
    
    const generateNewArray = () => {
        const newArray = [];
        for(let i = 0; i < 10; i++) {
            let num = Math.floor(Math.random()*500 + 10);
            newArray.push(num);
        }
        setArray(newArray);
        setIsComparing([]);
        setSorted([]);
    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));  

    const bubbleSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        const n =  arr.length;

        var swapped;

        for (let i = 0; i < n-1; i++) {
            swapped = false;

            for (let j = 0; j < n-i-1; j++) {
                setIsComparing([j, j+1]); // yahan us particular index ko highlight
                setArray([...arr]);
                await sleep(1000)

                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    setArray([...arr]);
                    await sleep(1000)
                }
                setIsComparing([]); // yahan remove kardunga highlight
            }
            setSorted(prev => [...prev, n-i-1]);

            if (!swapped) {
                const remaining = Array.from({ length: n - i - 1 }, (_, k) => k);
                setSorted(prev => [...prev, ...remaining]);
                break; 
            }
        }
        setSorted(Array.from({ length: n }, (_, i) => i));
        await sleep(500);
        setSorted([]);

        setIsSorting(false);
    };

    const insertionSort = async () => {
        setIsSorting(true)
        let newArray = [...array];
        const len = newArray.length;
        for(let i = 1; i < len; i++) {

            for(let j = i; j > 0; j--) {
                setIsComparing([j-1, j]);
                setArray([...newArray]); // bar height update if any change  
                await sleep(1000);
                if(newArray[j-1] > newArray[j]) {
                    [newArray[j-1], newArray[j]] = [newArray[j], newArray[j-1]]
                    setArray([...newArray]);
                   
                    await sleep(1000)
                }
                setIsComparing([]);
            }
            setSorted(Array.from({ length: i + 1 }, (_, k) => k)); // 0 se i
        }
        // Sorting khatam hone ke baad
        setSorted(Array.from({ length: len }, (_, i) => i));
        await sleep(500);
        setSorted([]); // optional: clear
        setIsSorting(false);
    }

    const selectionSort = async () => {
        setIsSorting(true)
        let newArray = [...array];
        const len = newArray.length;
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                setIsComparing([minIndex, j]);
                setArray([...newArray]);
                await sleep(1000);

                if (newArray[minIndex] > newArray[j]) {
                    minIndex = j;
                }
                setIsComparing([]);
            }
            if (minIndex !== i) {
                [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
                setArray([...newArray]);
                await sleep(1000);
            }
            setSorted(Array.from({ length: i + 1 }, (_, k) => k));

            // Early exit
            if (minIndex === i) {
                const remaining = Array.from({ length: len - i - 1 }, (_, k) => i + 1 + k);
                setSorted(prev => [...prev, ...remaining]);
                break;
            }
        }
        setSorted(Array.from({ length: len }, (_, i) => i));
        await sleep(500);
        setSorted([]);

        setIsSorting(false);
    }

    const mergeSort = async () => {
        setIsSorting(true);
        const arr = [...array];
        const len = arr.length;

        const merge = async (l, m, r) => {
            const left = arr.slice(l, m + 1);
            const right = arr.slice(m + 1, r + 1);
            let i = 0,
            j = 0,
            k = l;

            while (i < left.length && j < right.length) {
            setIsComparing([l + i, m + 1 + j]);
            setArray([...arr]);
            await sleep(1000);

            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
            }
            while (i < left.length) arr[k++] = left[i++];
            while (j < right.length) arr[k++] = right[j++];

            // show merged elements
            for (let p = l; p <= r; p++) {
            setArray([...arr]);
            setIsComparing([p]);
            await sleep(1000);
            }
            setIsComparing([]);
        };

        const ms = async (l, r) => {
            if (l >= r) return;
            const m = Math.floor((l + r) / 2);
            await ms(l, m);
            await ms(m + 1, r);
            await merge(l, m, r);

            // mark the whole sub-array as sorted
            setSorted((prev) => {
            const next = [...prev];
            for (let i = l; i <= r; i++) if (!next.includes(i)) next.push(i);
            return next;
            });
        };

        await ms(0, len - 1);

        setSorted(Array.from({ length: len }, (_, i) => i));
        await sleep(500);
        setSorted([]);
        setIsSorting(false);
    };

    const quickSort = async () => {
        setIsSorting(true);
        const arr = [...array];
        const len = arr.length;

        const partition = async (low, high) => {
            const pivot = arr[high];
            let i = low - 1;

            setPivotIndex(high);     // highlight pivot
            setArray([...arr]);
            await sleep(1000);

            for (let j = low; j < high; j++) {
            setIsComparing([j, high]);
            setArray([...arr]);
            await sleep(1000);

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await sleep(1000);
            }
            setIsComparing([]);
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            await sleep(1000);
            setPivotIndex(null);
            setIsComparing([]);

            return i + 1;
        };

        const qs = async (low, high) => {
            if (low < high) {
                const pi = await partition(low, high);
                setSorted(prev => [...prev, pi]);   // pivot is now in final position
                await qs(low, pi - 1);
                await qs(pi + 1, high);
            }
        };

        await qs(0, len - 1);

        setSorted(Array.from({ length: len }, (_, i) => i));
        await sleep(500);
        setSorted([]);
        setIsSorting(false);
    };

    return (
        <div className='my-app'>
            <h1 className='text-5xl font-display uppercase'>
                Sorting Visualizer
            </h1>

            <div className='text-center mt-6'>
                <button 
                    className='button' 
                    onClick={generateNewArray} 
                    disabled={isSorting}
                >
                    Generate New Array
                </button>

                <button 
                    className='button' 
                    onClick={bubbleSort} 
                    disabled={isSorting || array.length === 0}
                >
                    Bubble Sort
                </button>

                <button 
                    className='button' 
                    onClick={insertionSort} 
                    disabled={isSorting || array.length === 0}
                >
                    Insertion Sort
                </button> 

                <button 
                    className='button' 
                    onClick={selectionSort} 
                    disabled={isSorting || array.length === 0}
                >
                    Selection Sort
                </button>


                <button 
                    className='button' 
                    onClick={mergeSort} 
                    disabled={isSorting || array.length === 0}
                >
                    Merge Sort
                </button>


                <button 
                    className='button' 
                    onClick={quickSort} 
                    disabled={isSorting || array.length === 0}
                >
                    Quick Sort
                </button>
            </div>
            
            <VisualizerBars array={array} comparing={isComparing} sorted={sorted} pivot={pivotIndex}/>
        </div>
    )
}

export default SortingVisualizer

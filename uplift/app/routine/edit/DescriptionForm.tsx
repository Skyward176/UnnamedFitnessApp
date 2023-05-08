'use client'
import { HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark } from 'react-icons/hi2';
import { getDoc, updateDoc, addDoc, collection, getFirestore} from 'firebase/firestore';
import { AiOutlineSave } from 'react-icons/ai';
import IconButton from '@/components/IconButton';
import { searchClient } from '@/config/meili';
import { useState, useContext } from 'react';
import {RoutineContext} from '@/context/RoutineContext';
import {DocrefContext} from '@/context/DocrefContext';
import {firebase_app} from '@/config/firebaseInit';
const DescriptionForm = (props) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchDisplay, setSearchDisplay] = useState(false);
    const [routineData, setRoutineData] = useContext(RoutineContext);
    const [selectedTag, setSelectedTag] = useState(-1);
    const docRef = useContext(DocrefContext);

    const db = getFirestore(firebase_app);

    const searchHandler = async (query) => {
        setSearchQuery(query)
        const index = searchClient.index('tag_index')
        if (query != "") {
            const results = await index.search(query)
            setSearchResults(results.hits);
            setSearchDisplay('flex');
            setSelectedTag(0)
        } else {
            setSearchResults([]);
            setSearchDisplay('none');
        }
    }
    const handleTagSubmit = (e) => {
        var tagName = "";
        if(searchResults.length === 0) {
            tagName = searchQuery;
            const newTag =  addDoc(collection(db, 'tags'), {
                    name:searchQuery
                }
            );

        } else{
            tagName = searchResults[selectedTag].name;

        }
        if(!routineData.tags.includes(tagName)){
            let newTags = [...routineData.tags, tagName];
            setRoutineData({...routineData,
                tags: newTags
            })

            updateDoc(docRef, {
                tags: newTags
            })
            
        }
        setSearchQuery("");
        setSearchResults([]);

    }
    const deleteTag= (data) => {
            let newTags = routineData.tags.filter(function (tag) {
                return(tag!=data);
            });
            setRoutineData({
                ...routineData,
                tags:newTags
            });
            updateDoc(docRef, {
                tags: newTags
            })
        
    }
    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <label className='text-2xl font-light font-sans'>Title: </label>
                <input id='titleBox' onBlur={props.changeTitle} defaultValue={props.title} type='text' className='font-light font-sans text-2xl appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex flex-col h-1/2'>
                <label className='text-2xl font-light font-sans'>Description:</label>
                <input onBlur={props.changeDescription} defaultValue={props.description} type='text' className='font-light font-sans text-xl text-left w-full h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex items-center'>
                <div className='font-light font-sans'>
                    <label className='text-white text-2xl'>Tags</label>
                    <input type='text'
                        className='appearance-none  text-xl bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100'
                        onChange={(e) => searchHandler(e.target.value)}
                        onKeyDown={(e) => {e.key === "Enter"? handleTagSubmit(): null }}
                        value={searchQuery}
                        >

                    </input>
                    <div className='relative flex flex-col items-center justify-center w-48 text-white' style={{ display: searchDisplay }}>
                        {
                            Object.values(searchResults).map((tag) => <div key={tag.id} className='w-full flex items-center justify-center  text-center text-xl h-16 '>{tag.name}</div>)
                        }

                    </div>
                    <div className='flex justify-center text-gray-400 mt-4'>
                        {
                            routineData.tags.map((tag) => <div key={tag} className='flex items-center text-xl bg-gray-900 rounded-lg h-8 mx-1 p-1'>
                                <button onClick={(e)=> deleteTag(tag)}><HiXMark size="1.5rem" color="red"/></button>
                                {tag}
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
export default DescriptionForm;

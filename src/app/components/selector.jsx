'use client'

export default ({id,setSelected}) => {
    return (
        <button className='p-2 bg-green-300 w-full active:bg-green-600 hover:bg-green-400 rounded-lg' onClick={()=>setSelected(selected=>({...selected,[id]:!selected[id]}))}>
            {id===-1?'Select/Deselect All':'Select/Deselect'}
        </button>
    );
}
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { updateQuery } from '../redux/imageSlice';

function SearchForm() {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query === '') return;
    dispatch(updateQuery(query.toLowerCase()));
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef]);

  return (
    <div className='my-24'>
      <form 
        className="form lg:w-full w-[90vw] border-zinc-300 border-2" 
        onSubmit={handleSubmit}
      >
        <input 
          ref={inputRef}
          type="text"
          placeholder='search'
          className='w-full py-1.5 px-3 rounded-lg bg-zinc-100 placeholder:text-gray-800 border border-gray-400 rounded-tr-none rounded-br-none rounded-tl-full rounded-bl-full focus:outline-none'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type='submit'
          className='py-2 px-4 bg-zinc-100 hover:bg-zinc-200 rounded rounded-tl-none rounded-bl-none text-zinc-900 rounded-tr-full rounded-br-full'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm
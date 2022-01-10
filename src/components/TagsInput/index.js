import React, { useState, useEffect } from 'react';

const TagsInput = ({ label, id, name, placeholder, error, onChange, defaultTags }) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(defaultTags ? defaultTags : []);
  // const [tags, setTags] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (defaultTags) {
      setTags(defaultTags)
    }
  }, [defaultTags])

  const changeHandler = (e) => {
    setValue(e.target.value);
    onChange(name, tags);
  }

  const removeTag = (tag) => {
    const arr = tags.filter(t => t !== tag);
    setTags(arr);
    onChange(name, arr);
  }

  const updateTagsHandler = (e) => {
    e.preventDefault();

    // Add tags if input is not empty and if input value is not comma
    if(e.target.value !== '' && e.target.value !== ',') {

      if(e.key === ',') {

        const newTag = value.trim().split(',')[0];
        
        if(!tags.includes(newTag) && newTag !== '') {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(name, arr);
        }
        
        setValue('');

      } else if(e.key === 'Enter') {

        const newTag = value.trim();
       
        if(!tags.includes(newTag) && newTag !== '') {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(name, arr);
        }
        
        setValue('');

      }

    }

    // Remove tags if backspace is pressed
    if(e.key === 'Backspace' && tags.length > 0) {
      const copyOfTags = [...tags];
      copyOfTags.pop();
      setTags(copyOfTags);
      onChange(name, copyOfTags);
    }
  }

  const focusHandler = () => {
    setIsActive(true);
  }

  const blurHandler = () => {
    setIsActive(false);
  }


  return(
    <div className={!isActive ? "tags-input" : "tags-input active"}>
      {/* {label && <label htmlFor={id ? id : name}>{label}</label>} */}
      <div className="tags-input__wrapper mt-1">
        <div className="tags-input__tags2 flex flex-wrap">
          {tags.map((tag, i) => 
            <div key={i} className="flex bg-gray-200 justify-center items-center px-3 py-1 mr-2 rounded-full tag2">
              {tag} <span onClick={() => removeTag(tag)}><i className="fas fa-times-circle">
                <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                  </i></span>
            </div>
          )}
          <input 
            type="text"
            placeholder={tags.length ? " " : placeholder}
            name={name}
            id={id ? id : name}
            value={value}
            onChange={changeHandler}
            autoComplete="off"
            onKeyUp={updateTagsHandler}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            onFocus={focusHandler}
            onBlur={blurHandler}
            className="outline-none h-10 border-none mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default TagsInput;
import React from 'react';

const FormField = ({ formdata, change, id, src }) => {

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {formdata.validationMessage}
                </span>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                        { formdata.showlabel ? 
                            <label for="" className="capitalize">{formdata.config.label}</label>
                        :null}

                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event, id, blur:true})}
                            // onChange={(event)=> change({event, id}) }
                            className="h-10 border mt-1 rounded px-4 w-full"
                        />
                        {showError()}
                    </div>
                )
            break;
            case('select'):
                formTemplate = (
                    <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                        { formdata.showlabel ? 
                            <label for="" className="capitalize">{formdata.config.label}</label>
                        :null}
                        <select
                            className="w-full bg-gray-502 border rounded-md px-3 py-2 outline-none"
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        >
                            <option className="py-1" value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option 
                                        className="py-1 capitalize"
                                        key={item.key} 
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break;
            case('input_r'):
                formTemplate = (
                    <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                        { formdata.showlabel ? 
                            <label for="" className="capitalize">{formdata.config.label}</label>
                        :null}

                        <input
                            {...formdata.config}
                            value={formdata.value}
                            className="h-10 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                            readOnly
                        />
                        {showError()}
                    </div>
                )
            break;
            case('select_r'):
                formTemplate = (
                    <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                        { formdata.showlabel ? 
                            <label for="" className="capitalize">{formdata.config.label}</label>
                        :null}
                        <select
                            className="w-full bg-gray-50 border rounded-md px-3 py-2 outline-none"
                            value={formdata.config.selected}
                        >
                            <option className="py-1" value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option 
                                        className="py-1"
                                        key={item.key} 
                                        value={item.value}
                                        selected={formdata.config.selected === item.value}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break;
            case('textarea'):
            formTemplate = (
                <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                    { formdata.showlabel ? 
                        <label for="" className="capitalize">{formdata.config.label}</label>
                    :null}
                    <textarea
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event)=> change({event,id,blur:true})}
                        onChange={(event)=> change({event,id}) }
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" 
                        rows="4"
                    />
                    {showError()}
                </div>
            )
            break;
            case('textarea_r'):
            formTemplate = (
                <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '5'}`}>
                    { formdata.showlabel ? 
                        <label for="" className="capitalize">{formdata.config.label}</label>
                    :null}
                    <textarea
                        {...formdata.config}
                        value={formdata.value}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none bg-gray-50" 
                        rows="4"
                        readOnly
                    />
                    {showError()}
                </div>
            )
            break;
            case('image'):
            formTemplate = (
                <div className={`md:col-span-${formdata.colNum ? formdata.colNum : '1'}`}>
                    { formdata.showlabel ? 
                        <label for="" className="capitalize">{formdata.config.label}</label>
                    :null}
                    <div className="flex items-center py-3">
                        <div className="w-20 h-20 mr-4 flex-none rounded-xl border overflow-hidden">
                          <img className="w-20 h-20 mr-4 object-cover" src={src} alt="Avatar Upload" />
                        </div>
                    </div>
                </div>
            )
            break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }


    return (
        <>
            {renderTemplate()}
        </>
    );
}

export default FormField;

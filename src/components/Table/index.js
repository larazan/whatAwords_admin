import React, {useState} from 'react'

const Table = props => {

    const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(props.bodyData.slice(start, end))

        setCurrPage(page)
    }

  return (
    <>
      <div className="overflow-x-auto overflow-auto w-full">
        <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans ">
          <div className="w-full lg:w-5/62">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto overflow-auto">
                  {
                      props.headData && props.renderHead ? (
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                {
                                    props.headData.map((item, index) => props.renderHead(item, index))
                                }
                            </tr>
                        </thead>
                    ) : null
                  }
                  {
                        props.bodyData && props.renderBody ? (
                            <tbody className="text-gray-600 text-sm font-light"> 
                                {
                                    dataShow.map((item, index) => props.renderBody(item, index))
                                }
                            </tbody>
                        ) : null
                    }
              </table>
              <div className="flex justify-end mr-5">
              {
                pages > 1 ? (
                    // <ul className="flex pl-0 list-none rounded my-2">
                    <nav className="relative z-0 inline-flex overflow-x-auto rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {
                            range.map((item, index) => (
                              <a
                              key={index}
                              aria-current="page"
                              className={`z-10 my-2 cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currPage === index ? 'bg-gray-200' : ''}`}
                              onClick={() => selectPage(index)}
                            >
                              {item + 1}
                            </a>
                            ))
                        }
                    </nav>
                    
                     
                    
                ) : null
            }
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

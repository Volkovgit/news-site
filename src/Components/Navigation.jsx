import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurPage } from '../redux/rootReducer';

function Navigation() {
  const dispatch = useDispatch();
  let pages = useSelector(state=>state.pageCount);
  let curP = useSelector(state=>state.currentPage);
  const pagesArr = new Array(pages).fill(1).map(n=>(--pages)).reverse();

  const clickPage = (e)=>{
    dispatch(setCurPage(e.target.value));
    
  }

  // console.log(curP);
  return (
    <div>
      {pagesArr.map(p=>(<button key={p} onClick={clickPage} value={p}>{p}</button>))}
    </div>
  )
}

export default Navigation

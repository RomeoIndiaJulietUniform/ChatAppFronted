import React from 'react'
import "../CompStyles/NewsCrawl.css"


const NewsCrawl = () => {
  return (
    <div className='newsCrawl'>
      <marquee behavior='scroll' direction='left'>
        {["Dummies: (Please place any of the Details in the Search) User -> Name: Riju Mondal Email-> pilotrijurocks@gmail.com UID-> yE0TB09BbVfeW0sZ  ||  Group -> Name: LiberationWarrior UID-> H2cbTOgkNzrA. If you feel lonely in the app, please ping me."].map((article, index) => (
          <span key={index}>
            {article}
          </span>
        ))}
      </marquee>
    </div>
  )
}

export default NewsCrawl



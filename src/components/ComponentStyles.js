import React from "react";
import {Link} from 'react-router-dom';

export default function Landing() {
  return (
    <div class="landing">
      <nav>
        <ul>
          <li>First</li>
          <li>Second</li>
          <li>Third</li>
        </ul>
      </nav>
      <h1>Example Header</h1>
      <h2>Example sub-header</h2>
      <p>Great example paragraph woo. Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.Great example paragraph woo.</p>
      <Link to="#">Example Link</Link>
      <section className="card">
        <h1>Subsection Title</h1>
        <h3>A great subtitle would be here.</h3>
        <p>Tons of card details. Maybe instructions. Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.Tons of card details. Maybe instructions.</p>
        <button className="button outline-btn">Back</button>
        <button className="button">Forward</button>
      </section>
      <button className="button">Sample primary button</button>
      <button className="button outline-btn">Sample secondary button</button>
      <section className="memory-grid">
        <div className="memory-location">
          <p>1011</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1012</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1013</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1014</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1015</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1016</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1017</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1018</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
        <div className="memory-location">
          <p>1019</p>
          <p>Var Name</p>
          <p className='value'>Value</p>
        </div>
      </section>
    </div>
  );
}

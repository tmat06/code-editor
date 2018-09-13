import React, {Component} from 'react'

export default class MakeLessons extends Component{
    constructor(){
        super();
        this.state={
            tokens: [],
            lesson: "",
            testMode: "",
            order: "",
            tokenType: "",
            value: "",
            testable: false,
            connector: ""
        }
    }

    //Write the methods, and make all the values of the inputs, their value on state
    // Also make sure to write the axios call that subimts these into the database
    // Also make the endpoint for getting the list of lessons. Just the backend

    reset(){
        var {order, tokenType, value, testable, connector} = this.state
        var tokens = {VarName: "VarName", VarKeyword: "VarKeyword", String: "String", Operator: "Operator"}
        if(order
             && typeof order === "number" 
             && tokens[tokenType] 
             && value 
             && testable !== "" 
             && connector === "undefined" || typeof connector === "string"
            ){
            var temp = [...this.state.tokens];
            temp.push({order, tokenType, value, testable, connector})
            this.setState({tokens: [...temp], order: this.state.order + 1, tokenType: "", value: "", testable: false, connector: "" })
        } else {
            alert("Uh-oh. Something in the tokens part doesn't look right...")
        }
    }

    submit(){
        var {order, tokenType, value, testable, connector, lesson, testMode, tokens} = this.state
        this.reset();
        if(lesson 
            && typeof lesson === "number" 
            && testMode
            ){
            var sending = {lesson, testMode, tokens}
            this.setState=({lesson: "", testMode: "", tokens: [], order: ""})
            console.log(sending)
        } else {
            alert("Oops. Looks like the lesson or test mode is wrong, or you don't have any tokens...")
        }
    }
    
    render(){
        console.log(this.state)
        return(
            <div>
                <h1>Which Lesson is the quiz for?</h1>
                <input style={{color: "black"}} onChange={(e) => this.setState({lesson: +e.target.value ? +e.target.value : e.target.value})} value={this.state.lesson}/>
                <h1>Which test mode?</h1>
                <h3>{this.state.testMode}</h3>
                <button className="button" onClick={() => this.setState({testMode: "Clickable"})}>Clickable</button>
                <button className="button" onClick={() => this.setState({testMode: "Fill-In"})}>Fill in</button>

                <h1>Tokens:</h1>
                <h3>Order: (example: var would be 1)</h3>
                <input style={{color: "black"}} onChange={(e) => this.setState({order: +e.target.value ? +e.target.value: e.target.value})} value={this.state.order}/>
                <h3>Token Type: (types: VarKeyword, VarName, Operator, String)</h3>
                <input style={{color: "black"}} onChange={(e) => this.setState({tokenType: e.target.value})} value={this.state.tokenType}/>
                <h3>Value: </h3>
                <p>(example: if you want it to say var, type var)</p>
                <p>If token type is string, please insert it with quotes around it</p>
                <input style={{color: "black"}} onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}/>
                <h3>Testable?</h3>
                <p>{this.state.testable ? "true" : "false"}</p>
                <button className="button" onClick={() => this.setState({testable: true})}>True</button>
                <button className="button" onClick={() => this.setState({testable: false})}>False</button>
                <h3>Connected token value? (If none, select undefined)</h3>
                <h3>If connected token type is string, please insert it with quotes around it</h3>
                <input style={{color: "black"}} onChange={(e) => this.setState({connector: e.target.value})} value={this.state.connector}/>
                <button className="button" onClick={() => this.setState({connector: "undefined", })}>Undefined</button>
                <button className="button" onClick={() => this.reset()}>New Token</button>
                <button className="button" onClick={() => this.submit()}>Submit</button>
            </div>
        )
    }
}
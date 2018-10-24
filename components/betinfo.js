class BetInfo extends React.Component {
    render() {
        return (
            <div className="bet-info">
                <BetInput title="Bet Amount" minVal={0} maxVal={this.props.balance} step={0.01} val={this.props.bet.amount} changeVal={this.props.changeAmount}/>
                <BetInput title="Number" step={1} minVal={this.props.MIN} maxVal={this.props.MAX} val={this.props.bet.number} changeVal={this.props.changeNumber}/>
                <BetButtons winRatio={this.props.winRatio} play={this.props.play} number={this.props.bet.number}/>
            </div> 

        )
    }
}

class BetInput extends React.Component {
    inputChange(e) {
        let val = e.target.value;
        if (val >=this.props.minVal && val <=this.props.maxVal)
            this.props.changeVal(val);
    }
    
    render() {
        return (
            <div className="bet-input">
                <div className="bet-input-title">{this.props.title}</div>
                <input type="number" step={this.props.step} min={this.props.minVal} max={this.props.maxVal} className="bet-input-value" value={this.props.val} onChange={this.inputChange.bind(this)}/>
            </div>
        )
    }
}

class BetButtons extends React.Component {
    playHi() { console.log('play hi');
        this.props.play('hi');
    }

    playLo() {
        console.log('play lo');
        this.props.play('lo');
    }
    
    render() {
        return (
            <div className="bet-buttons">
                <BetButton title="Bet Hi" 
                            betType="hi"
                           click={this.playHi.bind(this)} 
                           winRatio={{number: this.props.number,
                                      percent: this.props.winRatio.percents.hi,
                                       payout: this.props.winRatio.payouts.hi}}/>
               <BetButton title="Bet Lo" 
                           click={this.playLo.bind(this)} 
                           betType="lo"
                           winRatio={{
                                      number: this.props.number,
                                      percent: this.props.winRatio.percents.lo,
                                       payout: this.props.winRatio.payouts.lo}}/>
            </div>
        )
    }
}

class BetButton extends React.Component {
    render() {
        return (
            <div className="bet-button-block">
                <button onClick={this.props.click}>{this.props.title}</button>
                <div className="bet-info-number">number {this.props.betType == 'hi' ? '>=' : '<='} {this.props.winRatio.number}</div>
                <div className="bet-info-item">Chance: <span className="info-value">{this.props.winRatio.percent}%</span></div>
                <div className="bet-info-item">Payout: <span className="info-value">{this.props.winRatio.payout}x</span></div>
            </div>
        );
    }
}
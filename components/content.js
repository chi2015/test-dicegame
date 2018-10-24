class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <BetInfo balance={this.props.params.balance} MIN={this.props.params.MIN} MAX={this.props.params.MAX} bet={this.props.params.bet} winRatio={this.props.params.winRatio} play={this.props.params.play} changeAmount={this.props.params.changeAmount} changeNumber={this.props.params.changeNumber}/>
                <Results result={this.props.params.result} 
                         winOrLose={this.props.params.winOrLose}
                        fairHash={this.props.params.fairHash}/>
            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="title">{this.props.title}</div>
                <Balance balance={this.props.balance} freeCredits={this.props.freeCredits}/>    
            </div>
        );
    }
}

class Balance extends React.Component {
    render() {
        return (
            <div className="balance">
                <div className="balance-info">Balance: <span className="balance-num">{this.props.balance}</span> credits</div>
                <button disabled={this.props.balance > 0} className="balance-btn" onClick={this.props.freeCredits}>Free Credits</button>
            </div>
        );
    }
}
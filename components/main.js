class Main extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("dicegame-balance")) props.changeBalance(localStorage.getItem("dicegame-balance"));
        this.onUnload = this.onUnload.bind(this);
    }

    
    componentDidMount() {
        let isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
        let eventName = isOnIOS ? "pagehide" : "beforeunload";
        window.addEventListener(eventName, this.onUnload);
    }

    onUnload(event) { // the method that will be used for both add and remove event
        localStorage.setItem('dicegame-balance', this.props.balance);
    }
    
    render() {
        return (
            <div className="main">
                <Header title="Dice Game" balance={this.props.balance} freeCredits={this.props.freeCredits}/>
                <Content params={this.props}/>    
            </div>
        );
    }
}
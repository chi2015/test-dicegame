class Results extends React.Component {
    render() {
        return (
            <div className="results">
                <ResultNumber winOrLose={this.props.winOrLose} result={this.props.result}/>
                <FairHash hash={this.props.fairHash}/>
            </div>
        );
    }
}

class ResultNumber extends React.Component {
    render() {
        return (
            <div className="result-number">
                <div className="result-title">Result</div>
                <div className="result-content">{this.props.result || ''} {this.props.winOrLose}</div>
            </div>
        );
    }
}

class FairHash extends React.Component {
    render() {
        return (
            <div className="fair-hash">
                <div className="fh-title">Provably Fair Hash</div>
                <div className="fh-value">{this.props.hash}</div>
            </div>
        );
    }
}
const {
    Provider,
    connect
} = ReactRedux;

const { bindActionCreators } = Redux;

/*-- CONNECT STORE AND ACTIONS TO PROPS --*/
const AppContainer = connect(
    function mapStateToProps(state) {
        console.log('state to props', state);
        state.winRatio = getWinRatio(state);
        state.winOrLose = getWinOrLose(state);
        state.fairHash = getFairHash(state);
        
        return state;
    },
    function mapDispatchToProps(dispatch) {
        console.log('dispatch to props', dispatch);
        return bindActionCreators(actions, dispatch);
    }
)(Main);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>, 
    document.getElementById('app')
);
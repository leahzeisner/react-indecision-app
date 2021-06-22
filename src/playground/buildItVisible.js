class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1> 
                <button onClick={this.handleToggleVisibility}>
                    {this.state.visible ? 'Hide Details' : 'Show Details'}
                </button>
                {this.state.visible && (
                    <div>
                        <p>These are some details you can see.</p>
                    </div>
                )}
            </div>
        );
    }

    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            };
        });
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));
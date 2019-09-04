import PropTypes from 'prop-types';
import React from 'react';
import Datamaps from 'datamaps';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './DataMaps.scss';
import Button from 'react-bootstrap/Button';
import ReactJson from 'react-json-view'
import Collapse from 'react-bootstrap/Collapse'
const MAP_CLEARING_PROPS = [
    'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps, newProps) => {
    return MAP_CLEARING_PROPS.some((key) =>
        oldProps[key] !== newProps[key]
    );
};

export default class Datamap extends React.Component {


    state = {
        displayJson: false,
        countryList: this.props.downloadData.map(x => {
            x['open'] = false;
            return x;
        }),
    }

    static propTypes = {
        arc: PropTypes.array,
        arcOptions: PropTypes.object,
        bubbleOptions: PropTypes.object,
        bubbles: PropTypes.array,
        data: PropTypes.object,
        graticule: PropTypes.bool,
        height: PropTypes.any,
        labels: PropTypes.bool,
        responsive: PropTypes.bool,
        style: PropTypes.object,
        updateChoroplethOptions: PropTypes.object,
        width: PropTypes.any
    };

    handleCollapse = async () => {
        this.setState({ displayJson: !this.state.displayJson })
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeMap);
        console.log(this.props)
        this.drawMap();
    }

    componentDidUpdate() {
        this.drawMap();
    }

    componentWillReceiveProps(newProps) {
        if (propChangeRequiresMapClear(this.props, newProps)) {
            this.clear();
        }
    }

    componentWillUnmount() {
        this.clear();
        window.removeEventListener('resize', this.resizeMap);

    }

    clear() {
        const { container } = this.refs;

        for (const child of Array.from(container.childNodes)) {
            container.removeChild(child);
        }

        delete this.map;
    }

    drawMap() {
        const {
            arc,
            arcOptions,
            bubbles,
            bubbleOptions,
            data,
            graticule,
            labels,
            updateChoroplethOptions
        } = this.props;

        let map = this.map;

        if (!map) {
            map = this.map = new Datamaps({
                ...this.props,
                fills: {
                    defaultFill: "#BDBDBB",
                    areaColor: "#CADCEB",
                    countryColor: "#FCCAC6"
                },
                element: this.refs.container
            });
        } else {
            map.updateChoropleth(data, updateChoroplethOptions);
        }

        if (arc) {
            map.arc(arc, arcOptions);
        }

        if (bubbles) {
            map.bubbles(bubbles, bubbleOptions);
        }

        if (graticule) {
            map.graticule();
        }

        if (labels) {
            map.labels();
        }
    }

    resizeMap = () => {
        this.map.resize();
    }

    handleDownload = async () => {
        let dataForJson = [];
        for (let key in this.props.downloadData) {
            dataForJson.push(this.props.downloadData[key])
        }

        var myWindow = window.open("", "MsgWindow");
        myWindow.document.write('<pre id="json"></pre>');
        myWindow.document.getElementById("json").innerHTML = JSON.stringify(dataForJson, undefined, 2);
    }

    loadLocations = () => { 
        return this.state.countryList.map((x, index) => {
            let open = x.open; 

            let data = [];
            for (let key in x.contexts) {
                data.push(x.contexts[key])
            } 

            return (

                <li key={index} className="event-list-item"
                    onClick={async () => {
                        let newcountryList = await this.state.countryList.map(y => { if (y.id === x.id) { y.open = !y.open } return y })
                        await this.setState({
                            countryList: newcountryList,
                        })
                    }}
                >
                    <div>
                        <p className="a-concept-name">{x.label}</p>
                    </div>
                    <div className="collapse-button">
                        <button
                            className=""
                            aria-expanded={open}>
                            {open ? (<p>&#x2303;</p>) : (<p className="open-arrow">&#x2303;</p>)}
                        </button>

                    </div>
                    <Collapse in={open}>
                        <div id="example-collapse-text"> 
                            <ul className="concept-list">
                                {data.map((t, index) => <li key={index} className="collapse-item">{index + 1}. {t.quote}</li>
                                )}
                            </ul>

                        </div>
                    </Collapse>
                </li>
            )
        })


    }


    render() {
        const style = {
            display: 'relative',
            ...this.props.style
        };

        return <div className="data-map-grid">

            <div className="dataMap">
                <h3 className="Title">
                    Extracted geographical locations
                </h3>
                <div className="grid-container">
                    <div className="grid-item">
                        <div ref="container" id="containerForMap" style={style} > </div>
                        <Row className="Datamap-info">
                            <Col>
                                <i><span className="areaColor"></span> Regions</i>
                                <i><span className="countryColor"></span> Countries</i>
                            </Col>
                        </Row>

                    </div>
                    <div className="grid-item">
                        <div className="country-list">
                            <ul className="linked-concepts-list">
                                {this.loadLocations()}
                            </ul>
                        </div>
                    </div>

                </div>
                <div>
                    <Row className="download-button-container">
                        <Col className="download-button">
                            <Button variant="primary" onClick={this.handleCollapse}>
                                {!this.state.displayJson ? <React.Fragment>Show data</React.Fragment> : <React.Fragment>Hide data</React.Fragment>}
                            </Button>
                        </Col>
                    </Row>

                    {this.state.displayJson ?
                        <React.Fragment>
                            <div className="json-with-data">
                                <ReactJson src={this.props.downloadData} collapsed={2} displayDataTypes={false} name={"Extracted locations"} />
                            </div>
                            <Button variant="primary" onClick={this.handleDownload}>
                                ⤓ download
                        </Button>
                        </React.Fragment>
                        : <React.Fragment></React.Fragment>
                    }
                </div>
            </div>
        </div>

    }

}

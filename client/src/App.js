import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Table, Spinner, Form, Row, Col, Button} from "react-bootstrap";

class App extends React.Component {

  state = {
    token: null,
    loading: false,
    computersError: false,

    computers: [],
    gpus: [],
    rams: [],
    processors: [],

    pcFilter: "",
    gpuFilter: -1,
    ramFilter: -1,
    processorFilter: -1
  };

  componentDidMount() {
    this.authenticate();
  }

  authenticate = () => {
    // authentication with hardcoded user (TODO remove after providing normal auth flow)
    fetch("http://localhost:4000/api/v1.0/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        username: "react",
        password: "express"
      }) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.token);
        this.setState({...this.state, token: res.token, loading: true}, this.initialize);
      })
      .catch(err => {
        console.log(err);
        setTimeout(this.authenticate, 500);
      });
  }

  initialize = () => {
    fetch("http://localhost:4000/api/v1.0/computers/initialize")
      .then(res => res.json())
      .then(result => {
        this.setState({...this.state, ...result, loading: false});
      })
  }

  getComputers = (filter) => {
    const {pcFilter, gpuFilter, ramFilter, processorFilter} = this.state;
    let searchFilter = filter || {
      gpu: gpuFilter,
      processor: processorFilter,
      computer: pcFilter,
      ram: ramFilter
    };
    fetch("http://localhost:4000/api/v1.0/computers/filter", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      authentication: "Bearer " + this.state.token,
      body: JSON.stringify(searchFilter) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({...this.state, loading: false, computers: res});
      })
      .catch(err => {
        this.setState({...this.state, computersError: err});
      });
  }

  clearFilters = () => {
    this.setState({...this.state, pcFilter: "", gpuFilter: -1, ramFilter: -1, processorFilter: -1}, this.getComputers);
  }

  handleSearch = ({target: {value}}) => {
    this.setState({...this.state, pcFilter: value});
  }

  handleProcessorChoice = ({target: {value}}) => {
    this.setState({...this.state, processorFilter: value});
  }

  handleGpuChoice = ({target: {value}}) => {
    this.setState({...this.state, gpuFilter: value});
  }

  handleRamChoice = ({target: {value}}) => {
    this.setState({...this.state, ramFilter: value});
  }

  renderTable = () => {
    const {computers} = this.state;
    return (
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Computer Model</th>
          <th>Processor</th>
          <th>GPU</th>
          <th>RAM</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {
          computers.map((computer, i) => {
            const {id, model, Processor, Gpu, Rams, price} = computer;
            return (
              <tr key={id}>
                <td>{i}</td>
                <td>{model}</td>
                <td>{Processor.manufacturer} {Processor.model}</td>
                <td>{Gpu.manufacturer} {Gpu.model}</td>
                <td>
                  {
                    Rams.map((ram, j) => {
                      let isLastCard = j+1 === Rams.length ? true : false;
                      return (
                        <span key={j+"n"}>
                            {ram.model} ({ram.memory}Gb {ram.memoryType}){!isLastCard && ", "}
                          </span>
                      )
                    })
                  }
                </td>
                <td>{price}</td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );
  }

  render() {
    const {loading, processors, gpus, rams, gpuFilter, processorFilter, ramFilter, pcFilter} = this.state;
    return (
      <div className="App">
        <div>
          <Form>
            <h3>Search</h3>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" value={pcFilter} placeholder="Enter model name" onChange={this.handleSearch}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formGridState">
                  <Form.Label>Processor</Form.Label>
                  <Form.Control as="select" value={processorFilter} onChange={this.handleProcessorChoice}>
                    <option value={-1}>Choose processor</option>
                    {
                      processors.map(processor => {
                        const {id, manufacturer, model} = processor;
                        return (
                          <option key={id} value={id}>{manufacturer} {model}</option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGridState">
                  <Form.Label>Graphics Card</Form.Label>
                  <Form.Control as="select" value={gpuFilter} onChange={this.handleGpuChoice}>
                    <option value={-1}>Choose Graphics Card</option>
                    {
                      gpus.map(gpu => {
                        const {id, manufacturer, model, memory, memoryType} = gpu;
                        return (
                          <option key={id} value={id}>{manufacturer} {model} {memory}Mb {memoryType}</option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGridState">
                  <Form.Label>RAM</Form.Label>
                  <Form.Control as="select" value={ramFilter} onChange={this.handleRamChoice}>
                    <option value={-1}>Choose RAM</option>
                    {
                      rams.map(ram => {
                        const {id, model, memory, memoryType, frequency} = ram;
                        return (
                          <option key={id} value={id}>{model} {memory}Gb {memoryType} ({frequency}MHz)</option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={4}/>
              <Col xs={4}>
                <Button variant="outline-danger" onClick={() => this.clearFilters()}>Clear</Button>
                <Button variant="primary" onClick={() => this.getComputers()}>Search</Button>
              </Col>
            </Row>
          </Form>
        </div>
        {
          loading ?
            <div>
              <Spinner animation="border" variant="info"/>
            </div> :
            this.renderTable()
        }




      </div>
    );
  }
}

export default App;

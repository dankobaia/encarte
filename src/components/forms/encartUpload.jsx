import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, Form, Button, Card, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select, { components } from "react-select";
import { ErrorModal, SuccessModal, Loading } from "../";
import {
  uploadEncarte,
  removeError,
  removeSuccess
} from "../../store/ducks/uploadEncarte";
import FileBase64 from "react-file-base64";

const INITIAL_STATE = {
  base64: "",
  selectedOption: null
};

const options = [
  {
    value: "id_guanabara",
    label: "Guanabara",
    thumb: "https://via.placeholder.com/300x300"
  },
  {
    value: "id_extra",
    label: "Extra",
    thumb: "https://via.placeholder.com/300x300"
  },
  {
    value: "id_sm",
    label: "Super Market",
    thumb: "https://via.placeholder.com/300x300"
  }
];

const Option = props => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <Row>
        <Col xs={{ span: 2 }}>
          <Image src={data.thumb} rounded height={50} />
        </Col>
        <Col xs={{ span: 10 }}>
          <label>{data.label}</label>
        </Col>
      </Row>
    </components.Option>
  );
};

class EncartUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  onDateStartChange = e => {
    this.setState({ start_date: e });
  };

  onDateEndChange = e => {
    this.setState({ end_date: e });
  };
  render() {
    let { uploadEncarte } = this.props;
    console.log(this.props);
    return (
      <Loading active={uploadEncarte && uploadEncarte.loading} spinner>
        <ErrorModal
          show={uploadEncarte && uploadEncarte.error}
          onHide={this.props.removeError}
          title="Error"
          message={uploadEncarte.errorMessage}
        />
        <SuccessModal
          show={uploadEncarte && uploadEncarte.success}
          onHide={() => {
            this.setState(INITIAL_STATE);
            this.props.removeSuccess();
          }}
          title="Success"
          message={uploadEncarte.successMesssage}
        />
        <Card>
          <Card.Header>
            <h4 className="float-left">Upload Encarte</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="form-store">
                <Row>
                  <Col>
                    <Form.Label>Store: </Form.Label>
                    <Select
                      components={{ Option }}
                      value={this.state.selectedOption}
                      onChange={this.handleChange}
                      options={options}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start date: </Form.Label>
                    <DatePicker
                      id="form-star-date"
                      selected={this.state.start_date}
                      selectsStart
                      startDate={this.state.start_date}
                      endDate={this.state.end_date}
                      onChange={this.onDateStartChange}
                      className="form-control w-100"
                    />
                  </Col>
                  <Col>
                    <Form.Label>End date: </Form.Label>
                    <DatePicker
                      id="form-end-date"
                      selected={this.state.end_date}
                      selectsEnd
                      startDate={this.state.start_date}
                      endDate={this.state.end_date}
                      onChange={this.onDateEndChange}
                      minDate={this.state.start_date}
                      className="form-control w-100"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="form-name">
                <Form.Label>Image: </Form.Label>
                <FileBase64
                  className="form-control"
                  Accept="image/png, image/jpeg"
                  onDone={file => this.setState({ base64: file.base64 })}
                />
                {/* <Form.Control
                  type="file"
                  required
                  onChange={e => console.log(e.target.files)}
                /> */}
              </Form.Group>
              <Button
                className="float-right"
                variant="success"
                size="lg"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  this.props.upload(
                    this.props.auth.user,
                    this.state.base64,
                    this.state.start_date,
                    this.state.end_date,
                    this.state.selectedOption.value
                  );
                }}
              >
                SAVE
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  uploadEncarte: state.uploadEncarte,
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      upload: uploadEncarte,
      removeError,
      removeSuccess
    },
    dispatch
  );

const EncartUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncartUploadForm);

export { EncartUpload };

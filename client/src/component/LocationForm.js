import React, { Component } from "react";
import { Form, Button, Card, Dropdown } from "semantic-ui-react";

const options = [
  {
    text: "Truck Stop",
    value: "Truck Stop"
  },
  {
    text: "On the Road",
    value: "On the Road"
  },
  {
    text: "Shipping Dock",
    value: "Shipping Dock"
  }
];

class LocationForm extends Component {
  state = {
    userId: "",
    location: "",
    postType: "",
    accidents: "",
    hazards: "",
    delays: "",
    scaleOpen: "",
    timeIn: "",
    delayTime: "",
    amenities: "",
    gasPrice: 30,
    parking: 30,
    comments: "",
    errors: {},
    loading: false,
    visible: false
  };
  handleSubmit = e => {
    e.preventDefault();
    let { location, postType } = this.state;
    let date = new Date();
    let payload = {
      location,
      postType,
      date
    };
    this.props.createLocations(payload);
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    return (
      <div
        style={{
          marginBottom: "2em"
        }}
      >
        <Card fluid>
          <Card.Content>
            {" "}
            {!this.state.visible ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <h1> Fighter </h1>{" "}
                  <label htmlFor="location"> Location </label>{" "}
                  <input
                    placeholder="Location"
                    name="location"
                    onChange={e =>
                      this.setState({
                        location: e.target.value
                      })
                    }
                  />{" "}
                </Form.Field>{" "}
                {(() => {
                  switch (this.state.postType) {
                    case "On the Road":
                      return (
                        <div>
                          <h1> On the Road </h1>{" "}
                          <Form.Field>
                            <label htmlFor="accidents">
                              What should the Fighters name ?
                            </label>{" "}
                            <input
                              placeholder="Name..."
                              name="accidents"
                              onChange={e =>
                                this.setState({
                                  accidents: e.target.value
                                })
                              }
                            />{" "}
                          </Form.Field>{" "}
                          <Form.Field>
                            <label htmlFor="hazards">
                              {" "}
                              Please right a bio ?{" "}
                            </label>{" "}
                            <input
                              placeholder="Write about yourself.."
                              name="hazards"
                              onChange={e =>
                                this.setState({
                                  hazards: e.target.value
                                })
                              }
                            />{" "}
                          </Form.Field>{" "}
                          <Form.Field>
                            <label htmlFor="delays">
                              What kind of stregth does he carry ?
                            </label>{" "}
                            <input
                              placeholder="Strength 1-100"
                              name="delays"
                              onChange={e =>
                                this.setState({
                                  delays: e.target.value
                                })
                              }
                            />{" "}
                          </Form.Field>{" "}
                        </div>
                      );

                    default:
                      return null;
                  }
                })()}{" "}
                <Button type="submit"> Submit </Button>{" "}
              </Form>
            ) : null}{" "}
          </Card.Content>{" "}
        </Card>{" "}
      </div>
    );
  }
}

export default LocationForm;

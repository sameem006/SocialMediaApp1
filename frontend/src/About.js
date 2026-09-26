import { useContext } from "react";
import { DataContext } from "././context/DataContext";

const About = () => {
      const { currentUser } = useContext(DataContext);

      return (
            <div className="about">
                  <h1>About Me</h1>

                  {currentUser ? (
                        <div className="userDetails">
                              <p>
                                    <strong>Name:</strong> {currentUser.fullName}
                              </p>

                              <p>
                                    <strong>Username:</strong> {currentUser.username}
                              </p>

                              <p>
                                    <strong>Email:</strong> {currentUser.email}
                              </p>
                        </div>
                  ) : (
                        <p>Loading user details...</p>
                  )}
            </div>
      );
};

export default About;

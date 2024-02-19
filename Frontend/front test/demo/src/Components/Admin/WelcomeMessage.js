import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Authentication, { useSession } from "../../Security/SessionContext";
const WelcomeMessage = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const history = useHistory();
  useEffect(() => {
    if (!Authentication.checkAutherization("ADMIN", isLoggedIn, setIsLoggedIn))
      history.push("/employee_login");

    //setUser(Test.getEmployee());
    //setRender(true);
  }, []);
  return (
    <div className="bg_updateprofile">
      <Card.Body style={{ color: "white", padding: 5 }}>
        <Card.Title>Welcome to CDAC BANK</Card.Title>
        <Card.Title>Dear {props.user.firstName},</Card.Title>
        <Card.Text>
          Welcome to CDAC BANK's administrative portal!
          <br />
          <br />
          We are delighted to have you join us as an administrator, entrusted
          with managing and overseeing the operations of our esteemed banking
          institution. As an administrator, you play a crucial role in
          maintaining the efficiency, security, and effectiveness of our
          services, ensuring that our customers receive the highest standards of
          banking excellence.
        </Card.Text>
        <Card.Text>
          At CDAC BANK, we are committed to providing our administrators with
          powerful tools and resources to facilitate seamless management and
          decision-making. Through this portal, you will have access to a
          comprehensive array of features designed to streamline your
          administrative tasks and empower you to make informed decisions.
        </Card.Text>
        <Card.Text>
          <strong>Key Functionalities:</strong>
          <ul>
            <li>
              Transaction History: View transaction histories for any branch
              within our network. Whether you need to review transactions for a
              specific branch, track monthly trends, or analyze yearly
              performance, our system allows you to access transaction data with
              ease. Simply select the desired branch and specify the date range
              or time period to retrieve comprehensive transaction records.
            </li>
            <li>
              Money Inlet and Outlet: Gain insights into the financial
              activities of our branches by monitoring money inlet and outlet.
              Track cash flows, identify patterns, and ensure the smooth flow of
              funds across our banking network. With real-time visibility into
              financial movements, you can effectively manage liquidity and
              optimize resource allocation.
            </li>
            <li>
              Branch Management: Add new branches to our network and assign
              managers to oversee their operations. Whether it's expanding our
              footprint to new locations or optimizing existing branches, you
              have the flexibility to scale our operations in alignment with our
              strategic objectives.
            </li>
          </ul>
        </Card.Text>
        <Card.Text>
          We understand the importance of security and confidentiality in
          banking operations. Rest assured, our administrative portal is
          equipped with robust security measures to safeguard sensitive data and
          protect the integrity of our banking system.
          <br />
          <br />
          Should you require any assistance or have any queries regarding the
          functionalities of this portal, our dedicated support team is
          available to provide prompt assistance and guidance.
        </Card.Text>
        <Card.Text>
          Once again, welcome to CDAC BANK's administrative portal. Your
          expertise and dedication are invaluable assets to our organization,
          and we look forward to achieving new heights of success together.
          <br />
          <br />
          Best regards,
          <br />
          CDAC BANK
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default WelcomeMessage;

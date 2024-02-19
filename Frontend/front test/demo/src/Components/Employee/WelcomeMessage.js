import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Authentication, { useSession } from "../../Security/SessionContext";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const WelcomeMessage = (props) => {
  const history = useHistory();
   const { isLoggedIn, setIsLoggedIn } = useSession();
  useEffect(() => {
    console.log("in welcome msg of empl :- 1st name := " + props.user.firstName);
    if (
      !Authentication.checkAutherization("MANAGER", isLoggedIn, setIsLoggedIn)
    )
      history.push("/employee_login");
   
  }, []);
  return (
    <div className="bg_updateprofile">
      <Card.Body style={{ color: "white", padding: 5 }}>
        <Card.Title>Dear {props.user.firstName},</Card.Title>
        <Card.Text>
          Welcome to CDAC BANK's branch management portal!
          <br />
          <br />
          We are thrilled to have you onboard as a branch manager, entrusted
          with the vital responsibility of overseeing the operations and
          ensuring the utmost satisfaction of our valued customers at your
          branch. Your role is pivotal in upholding the standards of excellence
          and efficiency that define our banking services.
        </Card.Text>
        <Card.Text>
          As a branch manager, you wield significant authority and
          responsibility in managing the affairs of your branch. Our branch
          management portal is equipped with a suite of powerful features
          designed to streamline your tasks and empower you to deliver
          exceptional service to our customers.
        </Card.Text>
        <Card.Text>
          <strong>Key Functionalities:</strong>
          <ul>
            <li>
              Account Management: View lists of active and inactive accounts at
              your branch. Identify dormant accounts and take proactive measures
              to optimize account activity. Additionally, suspend user accounts
              that have not initiated any transactions within the past year,
              ensuring the security and efficiency of our banking operations.
            </li>
            <li>
              Closed Accounts: Gain insights into closed accounts within your
              branch and analyze the reasons behind closures. Understanding
              account closures can inform strategic decisions and enhance
              customer retention efforts.
            </li>
            <li>
              Transaction History: Access comprehensive transaction histories
              for your branch, allowing you to track financial activities on a
              monthly, daily, or yearly basis. Retrieve transaction data with
              ease to review recent transactions, identify trends, or address
              customer inquiries.
            </li>
            <li>
              Money Inlet and Outlet: Monitor the flow of funds into and out of
              your branch to ensure optimal liquidity management. By tracking
              money inlet and outlet, you can identify opportunities to optimize
              cash flow, mitigate risks, and enhance operational efficiency.
            </li>
          </ul>
        </Card.Text>
        <Card.Text>
          Our branch management portal is equipped with robust security measures
          to safeguard sensitive data and protect the integrity of our banking
          system. Your dedication to maintaining the highest standards of
          professionalism and customer service is instrumental in our collective
          pursuit of excellence.
          <br />
          <br />
          Should you require any assistance or have any questions regarding the
          functionalities of this portal, our dedicated support team is
          available to provide guidance and support.
        </Card.Text>
        <Card.Text>
          Once again, welcome to CDAC BANK's branch management portal. Your
          leadership and expertise are essential to the success of our branch,
          and we are confident that together, we will continue to deliver
          exceptional banking experiences to our customers.
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

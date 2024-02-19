import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Authentication, { useSession } from "../../Security/SessionContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const WelcomeMessage = (props) => {
   const { isLoggedIn, setIsLoggedIn } = useSession();
   const history = useHistory();
   useEffect(() => {
     if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
       history.push("/user_login");
   }, []);
  return (
    <div className="bg_updateprofile">
      <div className="p-2" style={{color:"white"}}>
        
          <Card.Body>
            <Card.Title>
              Dear Valued Account Holder,{props.user.firstName}
            </Card.Title>
            <Card.Text>
              Welcome to CDAC BANK's online banking platform!
              <br />
              <br />
              We are excited to have you join our community of esteemed account
              holders, and we thank you for entrusting us with your financial
              needs. At CDAC BANK, we are committed to providing you with
              convenient, secure, and innovative banking solutions to empower
              you on your financial journey.
            </Card.Text>
            <Card.Text>
              As an account holder, you have access to a comprehensive suite of
              features and services designed to simplify your banking experience
              and enhance your financial well-being. Whether you're managing
              your day-to-day transactions, exploring new banking products, or
              monitoring your financial activities, our online banking platform
              offers you the tools and resources you need to achieve your
              financial goals.
            </Card.Text>
            <Card.Text>
              <strong>Key Functionalities:</strong>
              <ul>
                <li>
                  Money Transfer: Seamlessly transfer funds between your
                  accounts or to third-party accounts using our secure online
                  banking platform. Swift and secure transactions enable you to
                  manage your finances with ease.
                </li>
                <li>
                  Card Management: Order new debit or credit cards directly from
                  our online banking platform and manage your existing cards
                  with ease. Track usage, view active cards, and control
                  card-related activities.
                </li>
                <li>
                  Transaction History: Access detailed transaction histories for
                  your accounts, allowing you to track your financial activities
                  with precision. Review transactions on a daily, monthly,
                  yearly, or cumulative basis.
                </li>
                <li>
                  Financial Insights: Gain valuable insights into your financial
                  health and behavior through personalized reports and
                  analytics. Identify spending trends, set budgeting goals, and
                  make informed financial decisions.
                </li>
              </ul>
            </Card.Text>
            <Card.Text>
              Your security and privacy are our top priorities. Rest assured,
              our online banking platform is equipped with state-of-the-art
              security measures to safeguard your sensitive information and
              protect you from fraud and unauthorized access.
              <br />
              <br />
              Should you have any questions, concerns, or require assistance
              with any aspect of our online banking platform, our dedicated
              support team is available to provide prompt assistance and
              guidance.
            </Card.Text>
            <Card.Text>
              Once again, welcome to CDAC BANK's online banking platform. We are
              committed to serving you with excellence and empowering you to
              achieve your financial aspirations.
              <br />
              <br />
              Best regards,
              <br />
              CDAC BANK
            </Card.Text>
          </Card.Body>
       
      </div>
    </div>
  );
};

export default WelcomeMessage;

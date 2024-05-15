import Heading from "./Heading";
import styled from "styled-components";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Row from "../ui/Row";

const Icons = styled.div`
  align-items: end;

  svg {
    font-size: 4rem;
  }
  margin-right: 2px;
`;

export default function ActionAreaCard({ title, desc, icon }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        width: "100%",
        height: 150,
        margin: "0 10px 10px 0",
        padding: "10px",
      }}
    >
      <CardActionArea>
        <Row type="horizontal">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Heading as="h2">{title}</Heading>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Heading as="h3">{desc}</Heading>
            </Typography>
          </CardContent>
          <Icons>{icon}</Icons>
        </Row>
      </CardActionArea>
    </Card>
  );
}

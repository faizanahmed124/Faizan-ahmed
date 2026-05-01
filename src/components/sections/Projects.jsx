import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// ── Frappe V16 Notice Banner ──────────────────────────────────────────────────
const NoticeBanner = styled.div`
  width: 100%;
  max-width: 900px;
  background: linear-gradient(
    135deg,
    rgba(162, 89, 255, 0.08) 0%,
    rgba(162, 89, 255, 0.04) 100%
  );
  border: 1px solid ${({ theme }) => theme.primary + "55"};
  border-left: 4px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
  padding: 16px 22px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 14px;

  @media (max-width: 768px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

const NoticeIcon = styled.div`
  font-size: 22px;
  margin-top: 2px;
  flex-shrink: 0;
`;

const NoticeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NoticeTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.3px;
`;

const NoticeBody = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
// ─────────────────────────────────────────────────────────────────────────────

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "28px" }}>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        {/* ── Frappe V16 Active Work Notice ── */}
        <NoticeBanner>
          <NoticeIcon>🔒</NoticeIcon>
          <NoticeText>
            <NoticeTitle>
              Currently Working on Frappe Framework V16 — Confidential
            </NoticeTitle>
            <NoticeBody>
              I am currently employed as a <strong>Software Engineer &amp; DevOps</strong> working
              on <strong>Frappe Framework Version 16</strong> across every module — including
              HR, Inventory, Accounts, Manufacturing, CRM, and custom app development.
              Due to NDA and client confidentiality, I am unable to publicly
              showcase this work. This represents my most advanced and ongoing
              professional experience.
            </NoticeBody>
          </NoticeText>
        </NoticeBanner>
        {/* ─────────────────────────────────── */}

        <CardContainer>
          {toggle === "all" &&
            projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
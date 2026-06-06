import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

// ── Animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ── Layout ───────────────────────────────────────────────────────────────────
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 16px;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 12px;
`;

// ── Heading ──────────────────────────────────────────────────────────────────
const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  animation: ${fadeUp} 0.6s ease both;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 28px;
  animation: ${fadeUp} 0.7s ease both;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// ── NDA Banner ───────────────────────────────────────────────────────────────
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
  animation: ${fadeUp} 0.8s ease both;

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

// ── Category Filter ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",        label: "All",           emoji: "✦" },
  { key: "frontend",   label: "Frontend",      emoji: "🎨" },
  { key: "backend",    label: "Backend",       emoji: "⚙️" },
  { key: "web app",    label: "Full Stack",    emoji: "🌐" },
  { key: "automation", label: "Automation / ERP", emoji: "🔄" },
  { key: "machine learning", label: "AI / ML", emoji: "🤖" },
];

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 24px 0 32px;
  animation: ${fadeUp} 0.9s ease both;
`;

const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s ease;
  border: 1.5px solid
    ${({ active, theme }) => (active ? theme.primary : theme.primary + "55")};
  background: ${({ active, theme }) =>
    active ? theme.primary + "22" : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.primary : theme.text_secondary};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.primary + "15"};
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 480px) {
    padding: 7px 14px;
    font-size: 12px;
  }
`;

const ActivePill = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  animation: ${shimmer} 1.5s linear infinite;
`;

// ── Count Chip ────────────────────────────────────────────────────────────────
const CountChip = styled.span`
  font-size: 12px;
  font-weight: 700;
  background: ${({ theme }) => theme.primary + "30"};
  color: ${({ theme }) => theme.primary};
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: 4px;
`;

// ── Cards Grid ────────────────────────────────────────────────────────────────
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s ease both;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  opacity: 0.7;

  span {
    display: block;
    font-size: 40px;
    margin-bottom: 12px;
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────
const Projects = () => {
  const [toggle, setToggle] = useState("all");

  const filtered =
    toggle === "all"
      ? projects
      : projects.filter((p) => p.category === toggle);

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects — from web apps to AI
          systems and ERP automation. Here are some highlights.
        </Desc>

        {/* NDA Notice */}
        <NoticeBanner>
          <NoticeIcon>🔒</NoticeIcon>
          <NoticeText>
            <NoticeTitle>
              Currently Working on Frappe Framework V16 — Confidential
            </NoticeTitle>
            <NoticeBody>
              I am currently employed as a{" "}
              <strong>Software Engineer &amp; DevOps</strong> working on{" "}
              <strong>Frappe Framework Version 16</strong> across every module —
              including HR, Inventory, Accounts, Manufacturing, CRM, and custom
              app development. Due to NDA and client confidentiality, I am
              unable to publicly showcase this work. This represents my most
              advanced and ongoing professional experience.
            </NoticeBody>
          </NoticeText>
        </NoticeBanner>

        {/* Category Filter */}
        <FilterBar>
          {CATEGORIES.map(({ key, label, emoji }) => {
            const count =
              key === "all"
                ? projects.length
                : projects.filter((p) => p.category === key).length;
            const active = toggle === key;
            return (
              <FilterBtn
                key={key}
                active={active}
                onClick={() => setToggle(key)}
                aria-pressed={active}
              >
                {active && <ActivePill />}
                <span>{emoji}</span>
                {label}
                {count > 0 && <CountChip>{count}</CountChip>}
              </FilterBtn>
            );
          })}
        </FilterBar>

        {/* Project Cards */}
        {filtered.length > 0 ? (
          <CardContainer key={toggle}>
            {filtered.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </CardContainer>
        ) : (
          <EmptyState>
            <span>🚀</span>
            No projects in this category yet — coming soon!
          </EmptyState>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
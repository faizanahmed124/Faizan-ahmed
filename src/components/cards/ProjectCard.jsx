import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

// ── Animations ────────────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

// ── Category config ───────────────────────────────────────────────────────────
const CAT_CONFIG = {
  frontend: {
    label: "Frontend",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
    icon: "🎨",
  },
  backend: {
    label: "Backend",
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
    icon: "⚙️",
  },
  "web app": {
    label: "Full Stack",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.12)",
    icon: "🌐",
  },
  automation: {
    label: "Automation / ERP",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.12)",
    icon: "🔄",
  },
  "machine learning": {
    label: "AI / ML",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    icon: "🤖",
  },
};

const getConfig = (cat) =>
  CAT_CONFIG[cat?.toLowerCase()] || {
    label: cat || "Project",
    color: "#6B7280",
    bg: "rgba(107,114,128,0.12)",
    icon: "💡",
  };

// ── Styled Components ─────────────────────────────────────────────────────────
const Card = styled.div`
  width: 330px;
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.45s ease both;
  transition: transform 0.28s ease, box-shadow 0.28s ease,
    border-color 0.28s ease;
  cursor: default;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px ${({ theme }) => theme.primary + "25"};
    border-color: ${({ theme }) => theme.primary + "70"};
  }

  @media (max-width: 768px) {
    width: 290px;
  }
`;

/* Top accent line — uses category color */
const AccentBar = styled.div`
  height: 3px;
  background: ${({ color }) => color};
  width: 100%;
`;

/* Image / placeholder area */
const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight || "#111"};
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ color }) =>
    `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`};
  font-size: 44px;
`;

/* Category badge overlaid on image */
const CatBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color + "50"};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

/* Body */
const Body = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.35;
  margin: 0;
`;

const CardDesc = styled.p`
  font-size: 13px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "unset" : 3)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.2s;
`;

const ReadMore = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  text-align: left;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

/* Tags */
const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.primary + "15"};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  letter-spacing: 0.2px;
`;

/* Spacer pushes actions to bottom */
const Spacer = styled.div`
  flex: 1;
`;

/* Action buttons */
const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

const actionBase = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:active {
    transform: scale(0.97);
  }
`;

const PrimaryBtn = styled.a`
  ${actionBase}
  background: ${({ theme }) => theme.primary};
  color: #fff;
  flex: 1;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.primary + "cc"};
    transform: translateY(-1px);
  }
`;

const SecondaryBtn = styled.a`
  ${actionBase}
  background: ${({ theme }) => theme.primary + "18"};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "40"};
  flex: 1;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.primary + "30"};
    transform: translateY(-1px);
  }
`;

const GhostBtn = styled.a`
  ${actionBase}
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.text_secondary + "40"};
  flex: 1;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.text_secondary};
    background: ${({ theme }) => theme.text_secondary + "10"};
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    title,
    description,
    image,
    tags = [],
    category,
    webapp,
    github,
    LinkedIn,
    Link,
  } = project;

  const { label, color, bg, icon } = getConfig(category);
  const liveUrl = webapp || Link;
  const linkedinUrl = LinkedIn;

  return (
    <Card>
      <AccentBar color={color} />

      {/* Image / Placeholder */}
      <ImageWrap>
        {image ? (
          <CardImage src={image} alt={title} loading="lazy" />
        ) : (
          <ImagePlaceholder color={color}>
            <span>{icon}</span>
          </ImagePlaceholder>
        )}
        <CatBadge color={color} bg={bg}>
          {icon} {label}
        </CatBadge>
      </ImageWrap>

      {/* Body */}
      <Body>
        <CardTitle>{title}</CardTitle>

        {description && (
          <>
            <CardDesc expanded={expanded}>{description}</CardDesc>
            {description.length > 160 && (
              <ReadMore onClick={() => setExpanded((v) => !v)}>
                {expanded ? "Show less ▲" : "Read more ▼"}
              </ReadMore>
            )}
          </>
        )}

        {/* Tech Tags */}
        {tags.filter(Boolean).length > 0 && (
          <TagRow>
            {tags
              .filter(Boolean)
              .slice(0, 5)
              .map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            {tags.filter(Boolean).length > 5 && (
              <Tag>+{tags.filter(Boolean).length - 5} more</Tag>
            )}
          </TagRow>
        )}

        <Spacer />

        {/* Action Buttons */}
        <Actions>
          {liveUrl && (
            <PrimaryBtn href={liveUrl} target="_blank" rel="noopener noreferrer">
              🔗 Live Demo
            </PrimaryBtn>
          )}
          {linkedinUrl && (
            <SecondaryBtn
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </SecondaryBtn>
          )}
          {github && (
            <GhostBtn href={github} target="_blank" rel="noopener noreferrer">
              ⟨/⟩ Code
            </GhostBtn>
          )}
          {!liveUrl && !linkedinUrl && !github && (
            <GhostBtn as="div" style={{ cursor: "default", opacity: 0.5 }}>
              🔒 Confidential
            </GhostBtn>
          )}
        </Actions>
      </Body>
    </Card>
  );
};

export default ProjectCard;
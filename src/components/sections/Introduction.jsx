import React from "react";
import styled, { keyframes } from "styled-components";

// ========== ANIMATIONS ==========
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
`;

// ========== STYLED COMPONENTS ==========
const Section = styled.section`
  width: 100%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(133, 76, 230, 0.05) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 70, 209, 0.05) 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 80px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 48px;
    padding: 0 24px;
  }
`;

// ===== LEFT: IMAGE SIDE =====
const ImageSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInLeft} 0.9s ease forwards;
`;

const ImageFrame = styled.div`
  position: relative;
  width: 420px;
  height: 500px;
  border-radius: 24px;
  animation: ${float} 5s ease-in-out infinite;

  @media (max-width: 900px) {
    width: 100%;
    height: 360px;
  }

  /* Purple glow border */
  &::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 26px;
    background: linear-gradient(135deg, #854ce6, #a78bfa, #0046d1);
    z-index: 0;
  }

  /* Dark inner border */
  &::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 22px;
    background: #191924;
    z-index: 1;
  }
`;

const TeamImage = styled.img`
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: cover;
  object-position: center top;
  border-radius: 20px;
  z-index: 2;
`;

const ImageBadge = styled.div`
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: linear-gradient(135deg, #854ce6, #a78bfa);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 24px;
  border-radius: 30px;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(133, 76, 230, 0.4);
`;

// ===== RIGHT: TEXT SIDE =====
const TextSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeInRight} 0.9s ease forwards;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #854ce6;
`;

const Title = styled.h2`
  font-size: clamp(28px, 3.5vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  margin: 0;

  span {
    background: linear-gradient(90deg, #854ce6, #a78bfa, #854ce6);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 4px;
  border-radius: 4px;
  background: linear-gradient(90deg, #854ce6, #a78bfa);
`;

const Description = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.9;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 8px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(133, 76, 230, 0.25);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(133, 76, 230, 0.12);
    border-color: rgba(133, 76, 230, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(133, 76, 230, 0.2);
  }
`;

const StatNumber = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: #854ce6;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

// ========== COMPONENT ==========
const Introduction = () => {
  return (
    <Section id="introduction">
      <Container>

        {/* LEFT — IMAGE */}
        <ImageSide>
          <ImageFrame>
            {/* 
              Apni team/solo photo public folder mein rakho
              Example: public/team-photo.jpg
            */}
            <TeamImage
              src="/team-photo.jpg"
              alt="Faizan Ahmed with team"
            />
            <ImageBadge>Faizan & Team</ImageBadge>
          </ImageFrame>
        </ImageSide>

        {/* RIGHT — TEXT */}
        <TextSide>
          <Tag>Who I Am</Tag>

          <Title>
            Driven by <span>Passion</span>,<br />
            Defined by <span>Hard Work</span>
          </Title>

          <Divider />

          <Description>
            I'm <strong style={{ color: "#fff" }}>Faizan Ahmed</strong> — a
            full-stack developer & automation engineer who doesn't just write
            code, but builds solutions that matter. From integrating biometric
            devices with ERP systems to crafting AI-powered tools, every
            project reflects my obsession with quality and precision.
            Late nights, tight deadlines, and complex problems — that's
            where I thrive.
          </Description>

          <StatsGrid>
            <StatCard>
              <StatNumber>2+</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>15+</StatNumber>
              <StatLabel>Projects Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>10+</StatNumber>
              <StatLabel>Happy Clients</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>5+</StatNumber>
              <StatLabel>Technologies</StatLabel>
            </StatCard>
          </StatsGrid>
        </TextSide>

      </Container>
    </Section>
  );
};

export default Introduction;
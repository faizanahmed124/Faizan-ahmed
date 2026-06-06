import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage.jpg";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

// ========== ANIMATIONS ==========
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 18px rgba(133, 76, 230, 0.4); }
  50%       { box-shadow: 0 0 32px rgba(133, 76, 230, 0.8); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ========== STYLED COMPONENTS ==========
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 90px 30px 70px;
  z-index: 1;

  @media (max-width: 960px) { padding: 66px 16px 50px; }
  @media (max-width: 640px) { padding: 40px 16px 32px; }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 40px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 960px) {
    order: 2;
    align-items: center;
    text-align: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
  }
`;

// ── Greeting ──
const Greeting = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${fadeUp} 0.6s ease forwards;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 52px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.15;

  @media (max-width: 960px) { font-size: 38px; }
  @media (max-width: 640px) { font-size: 30px; }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 28px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 960px) {
    font-size: 20px;
    justify-content: center;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_primary + "bb"};
  max-width: 520px;
  margin-top: 4px;

  @media (max-width: 960px) {
    font-size: 14px;
    text-align: center;
  }
`;

// ── Buttons Row ──
const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;

  @media (max-width: 960px) { justify-content: center; }
`;

const PrimaryBtn = styled.a`
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #854ce6, #a78bfa);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: ${glow} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(133, 76, 230, 0.5);
  }
`;

const OutlineBtn = styled.a`
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #854ce6;
  background: transparent;
  border: 2px solid #854ce6;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(133, 76, 230, 0.1);
    transform: translateY(-3px);
  }
`;

// ── Social Icons ──
const SocialRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 8px;

  @media (max-width: 960px) { justify-content: center; }
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(133, 76, 230, 0.1);
  border: 1px solid rgba(133, 76, 230, 0.3);
  color: #854ce6;
  text-decoration: none;
  transition: all 0.3s ease;

  svg { font-size: 18px; }

  &:hover {
    background: #854ce6;
    color: #fff;
    border-color: #854ce6;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(133, 76, 230, 0.4);
  }
`;

// ── Image ──
const ImgWrapper = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 3px solid rgba(133, 76, 230, 0.6);
  padding: 5px;
  box-shadow:
    0 0 0 1px rgba(133, 76, 230, 0.2),
    0 8px 40px rgba(133, 76, 230, 0.3);
  animation: ${glow} 3s ease-in-out infinite;

  @media (max-width: 640px) {
    width: 260px;
    height: 260px;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// ========== COMPONENT ==========
const Hero = () => {
  return (
    <div id="About">
      <HeroContainer>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>

            {/* LEFT */}
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Greeting>👋 Hello, World!</Greeting>
                <Title>I am {Bio.name}</Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>

                <ButtonRow>
                  <PrimaryBtn
                    href={Bio.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub
                  </PrimaryBtn>
                  <OutlineBtn
                    href={Bio.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </OutlineBtn>
                </ButtonRow>

                <SocialRow>
                  <SocialIcon href={Bio.github} target="_blank">
                    <GitHubIcon />
                  </SocialIcon>
                  <SocialIcon href={Bio.linkedin} target="_blank">
                    <LinkedInIcon />
                  </SocialIcon>
                  <SocialIcon href={Bio.insta} target="_blank">
                    <InstagramIcon />
                  </SocialIcon>
                  <SocialIcon href={Bio.facebook} target="_blank">
                    <FacebookIcon />
                  </SocialIcon>
                </SocialRow>
              </motion.div>
            </HeroLeftContainer>

            {/* RIGHT */}
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <ImgWrapper>
                    <Img src={HeroImg} alt="Faizan Ahmed" />
                  </ImgWrapper>
                </Tilt>
              </motion.div>
            </HeroRightContainer>

          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
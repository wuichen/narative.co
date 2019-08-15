import React, { useState, useContext, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'

import {
  Button,
  ButtonArrow,
  Section,
  CopyToClipboard,
  Heading,
  Form,
  SocialLinks,
} from '@components'
import Hidden from '@components/Hidden'
import { ContactContext } from '@components/Contact/Contact.Context'
import mediaqueries from '@styles/media'
import { apiCall, startAnimation } from '@utils'
import { SubmittedCheckIcon } from '../../icons/ui'

const validate = values => {
  let errors = {}

  if (!values.name) {
    errors.name = 'Hi, we’re Narative. What’s your name?'
  }

  if (!values.email) {
    errors.email = "This one's important!"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Forgot a character?'
  }

  if (!values.details) {
    errors.details = 'Entice us!'
  }
  if (values.details.length > 289) {
    errors.details = 'Short and sweet, please!'
  }

  return errors
}

function ContactForm({ baseDelay }: { baseDelay: number }) {
  const { toggleContact } = useContext(ContactContext)

  const [animation, setAnimation] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    startAnimation(() => {
      setAnimation('start')
    })
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    const { company, details, email, name } = values

    const method = 'post'
    const endpoint = '/contact/proposal'
    const data = {
      company,
      email,
      details,
      name,
    }

    try {
      await apiCall({ method, endpoint, data })

      setFirstName(name.split(' ')[0])
      setSubmitting(false)
      setSubmitted(true)
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <Section>
      {submitted ? (
        <SubmittedScreen>
          <SubmittedCheckIcon />
          <SubmittedHeader>Thank you, {firstName}</SubmittedHeader>
          <SubmittedText>
            Our business development team will get back to you shortly.
          </SubmittedText>
          <SubmittedBackButton onClick={toggleContact}>
            Go back
          </SubmittedBackButton>
          <SocialLinksContainer>
            <SocialLinks fill="black" />
          </SocialLinksContainer>
          <CopyRightContainer>
            © {new Date().getFullYear()} Narative Studio Inc.
          </CopyRightContainer>
        </SubmittedScreen>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          validate={validate}
          validateOnBlur={false}
          initialValues={{
            name: '',
            email: '',
            details: '',
          }}
          render={props => {
            return (
              <StyledFormikForm>
                <FormSection
                  animation={animation}
                  delay={baseDelay + 350}
                  spacing="large"
                >
                  <FormHeader morePadding>Tell us about you</FormHeader>
                  <span>
                    <Field
                      component={Form.Text}
                      label="your name"
                      name="name"
                      autoFocus={true}
                    />
                    <Field
                      component={Form.Text}
                      label="email address"
                      name="email"
                    />
                    <Field
                      component={Form.Text}
                      label="company"
                      name="company"
                    />
                  </span>
                </FormSection>
                <FormSection animation={animation} delay={baseDelay + 480}>
                  <FormHeader>Tell us about your idea</FormHeader>
                  <Field
                    component={Form.Textarea}
                    label="give us a short description"
                    name="details"
                    rows={1}
                  />
                </FormSection>
                <ButtonContainer animation={animation} delay={baseDelay + 610}>
                  <ButtonArrow
                    isSubmitting={props.isSubmitting}
                    color="black"
                    text="Submit"
                    type="submit"
                  />
                </ButtonContainer>
                <MobileButtonContainer
                  animation={animation}
                  delay={baseDelay + 610}
                >
                  <Button isSubmitting={props.isSubmitting} text="Submit" />
                </MobileButtonContainer>
                <ContactByEmail animation={animation} delay={baseDelay + 610} />
              </StyledFormikForm>
            )
          }}
        />
      )}
    </Section>
  )
}

export default ContactForm

const ContactByEmail = ({ animation, delay }) => (
  <>
    <ContactWithEmail animation={animation} delay={delay}>
      <ContactWithEmailText>
        <CopyToClipboard
          copyOnClick="contact@narative.co"
          iconFill="rgba(0,0,0,0.3)"
        >
          Prefer to send us an email instead?{' '}
          <button>
            contact@narative.co{' '}
            <Hidden>Copy contact@narative.co go clipboard.</Hidden>
          </button>
        </CopyToClipboard>
      </ContactWithEmailText>
    </ContactWithEmail>
    <MobileContactWithEmail
      href="mailto:contact@narative.co"
      animation={animation}
      delay={delay}
    >
      Prefer to send us an email instead? <span>contact@narative.co</span>
    </MobileContactWithEmail>
  </>
)

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeUpAnimation = css`
  transition: opacity 0.5s linear ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;
  opacity: ${p => (p.animation ? 1 : 0)};
  transform: ${p => (p.animation ? 'translateY(0)' : 'translateY(20px)')};
`

const FormHeader = styled(Heading.h2)`
  color: #000;
  width: 265px;
  padding-right: ${p => (p.morePadding ? '100px' : '76px')};

  ${mediaqueries.tablet`
    width: 100%;
    padding: 0;
    margin-bottom: 5px;
    color: ${p => p.theme.colors.grey};
  `};
`

const FormSection = styled.div`
  display: flex;
  margin-bottom: ${p => (p.spacing === 'large' ? '7rem' : '2.5rem')};

  ${mediaqueries.tablet`
    margin-bottom: ${p => (p.spacing === 'large' ? '2rem' : '1rem')};
    flex-direction: column;
  `};

  ${fadeUpAnimation}
`

const ContactWithEmailText = styled.div`
  padding-top: 55px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.33);

  button {
    text-decoration: underline;
    font-weight: 600;

    &:focus {
      color: ${p => p.theme.colors.purple};
    }
  }
`

const MobileContactWithEmail = styled.a`
  display: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.33);
  margin-top: 40px;
  ${fadeUpAnimation}

  ${mediaqueries.tablet`
    display: block;
  `};

  span {
    text-decoration: underline;
    font-weight: 600;
  }
`

const ContactWithEmail = styled.div`
  position: relative;
  padding-top: 55px;
  margin-left: 265px;
  ${fadeUpAnimation}

  &::after {
    content: '';
    height: 1px;
    width: 295px;
    position: absolute;
    left: 0;
    top: 55px;
    background: #c6c6c6;
  }

  &::before {
    content: '';
    height: 5px;
    width: 5px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 53px;
    background: #c6c6c6;
  }

  ${mediaqueries.tablet`
    display: none;
  `};
`
const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  padding-bottom: 10rem;
  margin: 0 auto;
  background: #fff;
  z-index: 99999;

  ${mediaqueries.desktop_large`
    margin-left: 0;
    width: 100%;
    padding: 0 4rem 5rem;
  `};

  ${mediaqueries.desktop`
    margin: 0 auto;
    padding: 0 0 5rem;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `};
`

const SubmittedScreen = styled.div`
  width: 46rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  align-self: flex-end;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 1.2s ease forwards;

  ${mediaqueries.desktop`
    padding-bottom: 0;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 8rem;
  `};

  svg {
    margin-bottom: 3rem;
  }
`

const SubmittedHeader = styled(Heading.h2)`
  margin-bottom: 3rem;
  color: #000;
`

const SubmittedText = styled.p`
  color: ${p => p.theme.colors.grey};
  font-size: 2.2rem;
  max-width: 275px;
  margin-bottom: 3rem;
`

const SubmittedBackButton = styled.button`
  font-size: 18px;
  font-weight: 600;
`

const SocialLinksContainer = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  margin: 100px auto 50px;
  justify-content: space-between;
`

const CopyRightContainer = styled.div`
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
`

const ButtonContainer = styled.div`
  margin-left: 265px;
  padding-top: 35px;
  ${fadeUpAnimation}

  ${mediaqueries.tablet`
    display: none;
  `};
`

const MobileButtonContainer = styled.div`
  display: none;

  ${fadeUpAnimation}

  ${mediaqueries.tablet`
    display: block;
  `};
`

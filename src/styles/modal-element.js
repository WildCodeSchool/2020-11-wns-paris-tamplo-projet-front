import styled from 'styled-components'

export const Title = styled.h1`
  display: flex;
  font-size: 35px;
  padding: 0.2em 2em;
  color: #421307;
`
export const Modal = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 50%;
  margin: auto;
  background: #f9f5f4;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const SimpleText = styled.p`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  color: #421307;
  padding: 0.8em;
  font-size: 25px;
`
export const Label = styled.label`
  margin: 0 0.8em;
  font-size: 40px;
  color: #421307;
`
export const Container = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
`
export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: auto;
`
export const Button = styled.button`
  width: 200px;
  border: none;
  background: #421307;
  color: white;
  border-radius: 15px;
  padding: 0.4em;
  margin: 2em auto;
  font-family: 'Quicksand';
  font-weight: bold;
`
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
  margin: 0;
`

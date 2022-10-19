import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${props => props.transparent ? 'transparent' : '#fff'};
  padding: 10px 20px;
  min-height: 100vh;

  position: relative;

  & > .centered {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const CenteredContainer = styled.div`
  height: 100vh;
`

export const Button = styled.button`
  margin: 5px;
  padding: 5px 15px;
  transition: box-shadow .25s ease-out, background-color .25s, color .25s;

  background-color: ${({ primary }) => primary ? 'dodgerblue' : 'transparent'};
  color: ${({ primary }) => primary ? 'white' : 'dodgerblue'};
  border: 1px solid dodgerblue;
  border-radius: 5px;
  text-transform: capitalize;
  ${props => props.danger && css`
      background-color: rgb(255, 211, 203);
      color: red;
      border: 0;
  `}

  ${props => props.small && css`
    margin: 2px;
    font-size: .8em;
    margin-left: 7px;
    padding: 2px 7px;
  `}

  &:hover {
    opacity: .9;
    box-shadow: 3px 3px 1px rgb(148, 201, 253);
    ${props => !props.danger && (props.primary || css`
      background-color: dodgerblue;
      color: white;
    `)}
  };
`

export const Input = styled.input`
  display: ${({ block }) => block ? 'block' : 'inline-block'};
  margin: 5px 0;
  min-width: 150px;
  padding: 5px 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
`

export const Comments = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
export const Comment = styled.li`
  margin: 10px 5px;
  border: 1px solid #eee;
  padding: 10px 15px;
  border-radius: 7px;
`

export const Box = styled.div`
  margin: 7px;
  padding: 10px 15px;
  border-radius: 7px;
  border: 1px solid #eee;
  width: 300px;
  transition: box-shadow ease .25s, border-color .3s;
  background-color: #fff;

  & form * {
    width: 100%;
  }

  &:hover {
    border-color: #ccc;
    box-shadow: 3px 3px 5px #eee;
  }
`

export const BlogContainer = styled(Box)`
  width: 100%;
`

export const Title = styled.h1`
  text-align: ${props => props.center ? 'center' : 'left'};
  color: dodgerblue;
  text-transform: capitalize;
  font-size: 2.5em;
`

export const Nav = styled.nav`
  padding: 10px 0px;
  margin: 5px;
  border-bottom: 2px solid #eee;

  display: flex;
  justify-content: space-between;
  align-content: center;
`

export const NavLinkContainer = styled(NavLink)`
  color: tomato;
  font-size: 1.2em;
  margin: 0px 5px;
  text-transform: uppercase;
  transition: background-color 1s, color .25s ease-in .1s;

  &.active {
    text-decoration: underline 3px dodgerblue;
  }

  &:hover {
    background-color: tomato;
    color: white
  }
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Main = styled.main`
  margin-bottom: 50px;
`

export const FooterContainer = styled.footer`
  margin-top: 5px;
  border-top: 2px solid rgb(148, 201, 253);
  background-color: #fbfbfb;
  padding: 10px 20px;
  text-align: center;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

export const NotificationContainer = styled.div`
    font-weight: bold;
    margin: 5px;
    padding: 10px 15px;
    border-radius: 7px;
    z-index: 3;

    min-width: 300px;
    position: absolute;
    bottom: 20px;
    right: 10px;
  
    display: flex;
    align-items: center;
    justify-content: space-between;

    & span {
      cursor: pointer;
      display: inline-block;
      width: 22px;
      height: 22px;
      line-height: 22px;
      font-size: 24px;
      text-align: center;
      font-family: 'Courier New', Courier, monospace ;
    }

    & span:hover {
      background-color: rgb(0,0,0,.2);
    }

    ${props => props.error ? css`
        background-color: rgb(255, 211, 203);
        color: red;
      ` : css`
        background-color: rgb(226, 247, 194);
        color: green;
      `}
`

export const Table = styled.table`
  min-width: 300px;
  border-collapse: collapse;
  box-shadow: 3px 3px 3px #eee;
  border-radius: 7px;
  
  & th, & td {
    border-bottom: 1px solid #eee;
    text-align: left;
    padding: 7px 10px;
  }

  & th {
    padding: 0;
    text-transform: capitalize;
  }
  
  & tr:nth-child(even) {
    background-color: #eee;
  }
`
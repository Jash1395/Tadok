import React from 'react'
import styled from 'styled-components'
import { useGetIsSticky } from '../../hooks/useGetIsSticky'

const Container = styled.div<{ $isSticky: boolean }>`
    position: sticky;
    padding: 0.4rem 0;
    width: 100vw;
    top: calc(var(--navbar-height) + 4.3rem);
    background-color: ${(props) => (props.$isSticky ? 'var(--card-bg)' : null)};
    transition: background-color var(--transition-bg-duration) ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

const RadioContainer = styled.div`
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    > :not(:last-child) {
        margin-right: 0.4rem;
    }
`

const Input = styled.input`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
`
const Label = styled.label<{ $isChecked: boolean }>`
    height: 100%;
    width: 3.2rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--card-text);
    background-color: ${({ $isChecked }) =>
        $isChecked ? 'var(--two-theme)' : 'var(--one-theme)'};
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-bg-duration);
`

interface Props {
    level: Level
    setLevel: (level: Level) => void
}

export const LevelRadio = ({ level, setLevel }: Props) => {
    const { containerRef, isSticky } = useGetIsSticky()
    const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        setLevel(target.value as Level)
    }

    return (
        <Container ref={containerRef} $isSticky={isSticky}>
            <RadioContainer>
                {levels.map((_level) => (
                    <React.Fragment key={_level}>
                        <Input
                            type="radio"
                            name={'level'}
                            value={_level}
                            id={_level}
                            checked={level === _level}
                            onChange={radioHandler}
                        />
                        <Label htmlFor={_level} $isChecked={level === _level}>
                            {_level}
                        </Label>
                    </React.Fragment>
                ))}
            </RadioContainer>
        </Container>
    )
}

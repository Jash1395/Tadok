import React from 'react'
import styled from 'styled-components'
import { useGetIsSticky } from '../../hooks/useGetIsSticky'
import { DateRange } from './DateRange'

const Container = styled.div<{ $isSticky: boolean }>`
    position: sticky;
    padding: 0.4rem 0;
    height: 4rem;
    width: 100vw;
    top: calc(var(--navbar-height));
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
    width: 3.7rem;
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
    timescale: string
    filteredTotalData: SummedStats[]
    setTimeScale: (timescale: Timescale) => void
}

export const TimescaleRadio = ({
    timescale,
    filteredTotalData,
    setTimeScale,
}: Props) => {
    const { containerRef, isSticky } = useGetIsSticky()
    const timescales: Timescale[] = ['All', 'Year', 'Month', 'Week', 'Today']
    const timerange = {
        start: filteredTotalData[filteredTotalData.length - 1]?.date,
        end: filteredTotalData[0]?.date,
    }

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        setTimeScale(target.value as Timescale)
    }

    return (
        <Container ref={containerRef} $isSticky={isSticky}>
            <DateRange timerange={timerange} />
            <RadioContainer>
                {timescales.map((time) => (
                    <React.Fragment key={time}>
                        <Input
                            type="radio"
                            name={'timescale'}
                            value={time}
                            id={time}
                            checked={timescale === time}
                            onChange={radioHandler}
                        />
                        <Label htmlFor={time} $isChecked={timescale === time}>
                            {time}
                        </Label>
                    </React.Fragment>
                ))}
            </RadioContainer>
        </Container>
    )
}

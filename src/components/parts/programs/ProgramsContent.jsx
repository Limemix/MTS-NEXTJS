"use client";
import React from "react";
import '@/styles/ProgramsContent.css'
import Carousel from "@/components/Carousel";

function Program(props) {
    const {program} = props

    return (
        <div className="slide container-row program">
            <div className="program-image">
                {program.imagePath ? (
                    <img src={'/images/'+program.imagePath} alt="..."/>
                ) : (
                    <div className="placeholder"></div>
                )}
            </div>
            <div className="program-body">
                <h4>{program.name}</h4>
                <p>{program.description}<br/><br/></p>
                {program.type && (
                    <p>
                        * Тип заняття: <b>{program.type}</b><br />
                    </p>
                    )}
                    {program.numberOfLessons && (
                        <p>
                            * Кількість занять: <b>{program.numberOfLessons}</b> тиждень.<br />
                        </p>
                    )}
                    {program.lessonDuration && (
                        <p>
                            * Тривалість занять: по <b>{program.lessonDuration} хв</b><br />
                        </p>
                    )}
                    {program.courseDuration && (
                        <p>
                            * Тривалість курсу: <b>{program.courseDuration}</b><br />
                        </p>
                    )}
                    {program.coursePrice && (
                        <p>
                            * Вартість курсу: <b>{program.coursePrice} грн</b>
                        </p>
                    )}
            </div> 
        </div>
    )
}

export default function ProgramsContent(props) {

    const {programs} = props
    
    return (
        <Carousel>
            {programs.map((program, index) => (
                <Program key={index} program={program} />
            ))}
        </Carousel>
    )
}
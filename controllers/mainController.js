"use strict";

let courses = [
    {
        title: "BSc Hon Computer Science",
        code: "CS432",
        leader: "Dr Lizzy Burton",
        department: "Computing"
    },
    {
        title: "BSc Hon Mathematics",
        code: "MA441",
        leader: "Dr Johnson Ron Swanson",
        department: "Mathematics"
    },
    {
        title: "BSc Hon Sadness",
        code: "SAD23",
        leader: "Dr Saddy McSadFace",
        department: "Life"
    }
];

exports.showCourses = (req, res) => {
    res.render("courses", {
        offeredCourses: courses
    });
};
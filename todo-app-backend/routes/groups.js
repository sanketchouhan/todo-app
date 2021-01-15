var express = require('express');
const bodyParser = require('body-parser');
var Groups = require("../model/group.model")
var groupRouter = express.Router();

groupRouter.use(bodyParser.json());

/* GET all groups and tasks. */
groupRouter.post('/all', function(req, res, next) {
    Groups.find({userId : req.body.userId}).then((g) => {
       if(g){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(g);
       }else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ 'error': "No group found" });
       }
    }, (err) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ 'error': "Error! No group found" });
    }).catch((err) => next(err));
});

// POST new group 
groupRouter.post('/', function(req, res, next) {
    var group = new Groups();
    group.userId = req.body.userId;
    group.name = req.body.name;
    group.save().then((grp) => {
       Groups.find({userId : req.body.userId}).then((g) => {
       if(g){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(g);
       }else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ 'error': "No group found" });
       }
    }, (err) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ 'error': "Error in saving new group" });
    }).catch((err) => next(err));
});
});

//Update group name
groupRouter.put('/', function (req, res, next) {
    Groups.updateOne({ _id: req.body.id }, { $set: { name: req.body.name } })
        .then((group) => {
            Groups.find({userId : group.userId}).then((g) => {
                if(g){
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json(g);
                }else{
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json({ 'error': "No group found" });
                }
            })
        }, (err) => next(err))
        .catch((err) => next(err));
});

//delete group
groupRouter.post('/delete',function (req, res, next) {
    Groups.deleteOne({ _id: req.body.id })
        .then((grp) => {
            // console.log(req.body , grp)
            Groups.find({userId : req.body.userId}).then((g) => {
                if(g){
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json(g);
                }else{
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json({ 'error': "No group found" });
                }
            })
        }, (err) => next(err))
        .catch((err) => next(err));
})

// POST new task with group id in body
groupRouter.post('/task', function(req, res, next) {
    Groups.findOne({_id : req.body.id}).then(grp=>{
        // console.log(grp)
        if(grp){
            grp.tasks.push({messageBody: req.body.message});
            // console.log(grp)
            grp.save().then(task=>{
                Groups.find({userId : grp.userId}).then((g) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(g);
                }, (err) => {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ 'error': "Error in saving new task" });
                })
            })   
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ 'error': "No group found" });
        }
    }, (err) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ 'error': "Error in saving new task" });
    }).catch((err) => next(err));
});

// edit task with group id and task id in body
groupRouter.put('/task', function (req, res, next) {
    Groups.findOne({ _id: req.body.id }).then(group=>{
        if(group){
            group.tasks.forEach(item => {
                if(item._id == req.body.taskId){
                    item.messageBody = req.body.message;
                    item.completed = req.body.completed;
                }
            })
            group.save().then((grp) => {
                Groups.find({userId : group.userId}).then((g) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(g);
                }, (err) => {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ 'error': "Error in saving new task" });
                })
            }, (err) => {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.json({ 'error': "Error in editing task" });
            })
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ 'error': "No group found" });
        }
    })
});

// edit task with group id and task id in body
groupRouter.post('/task/delete', function (req, res, next) {
    Groups.findOne({ _id: req.body.id }).then(group=>{
        // console.log(req.body.id ,req.body.taskId , group)
        if(group){
            var tasks =  group.tasks.filter(item => item._id != req.body.taskId );
            group.tasks = tasks;
            group.save().then((grp) => {
                Groups.find({userId : group.userId}).then((g) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(g);
                }, (err) => {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ 'error': "Error in saving new task" });
                })
            }, (err) => {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.json({ 'error': "Error in editing task" });
            })
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ 'error': "No group found" });
        }
    })
});

module.exports = groupRouter
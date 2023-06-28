# Martian Robots Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. This is a program that
determines each sequence of robot positions and reports the final position of the robot.

### Features implemented

- [x] A robot can be moved around a grid of a predefined size (that does not exceed the maximum size of 50x50).
- [x] The robot that is lost off of the grid is marked as 'LOST' and its last valid grid position and orientation is reported.
- [x] Multiple robots can be added to a Grid and moved around simultaneously.
- [x] The maximum length of a command sequence is 100 characters.
- [ ] Lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point.
- [ ] Execute the programme from the command line.

### How to run the application

1. Installation

```bash
$ git clone
$ cd martian-robots
$ npm install
```
2. Run the tests

```bash
$ npm run test
```

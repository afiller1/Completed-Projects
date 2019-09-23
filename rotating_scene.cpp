/***
 Assignment-3: Geometric Modeling of a Scene
 
 Name: Filler, Alexia
 
 Collaborators: Ingrey, Ali
 ** Note: although the assignment should be completed individually
 you may speak with classmates on high level algorithmic concepts. Please
 list their names in this section
 
 Project Summary: For this project, I hardcoded multiplication matrices for translation, rotation, and scaling.
 I also implemented a build_cube function, which takes an intial plane, copies it, and translates/rotates it six times
 -- one per face of a cube. This function is used to create cubes, and it is implemented in my init_scene function
 to create a small scene. Overall, the main section of this assignment was the build_cube, because it required close
 attention to the transformations of each face, and then the init_scene function, which holds all of the code for
 the actual scene I created.
 ***/


#pragma GCC diagnostic ignored "-Wdeprecated-declarations"

#ifdef __APPLE__
#include <OpenGL/gl.h>
#include <OpenGL/glu.h>
#include <GLUT/glut.h>
#else
#include <GL/gl.h>
#include <GL/glu.h>
#include <GL/glut.h>
#endif

#pragma GCC diagnostic pop

#include <iostream>
#include <stdlib.h>
#include <math.h>
#include <vector>
using namespace std;

// If a float is < EPSILON or > -EPILSON then it should be 0
float EPSILON = 0.000001;
// theta is the angle to rotate the scene
float THETA = 0.0;
// Vector placeholders for the scene and color array
vector<GLfloat> SCENE;
vector<GLfloat> COLOR;

/**************************************************
 *  Rectangular Prisms via Hierarchical Modeling  *
 *                                                *
 *  using planes as building blocks, build a unit *
 *  cube with transformations that will serve as  *
 *  a primitive for modeling objects in the scene *
 *                                                *
 *************************************************/

// Initializes a square plane of unit lengths
vector<GLfloat> init_plane() {
    vector<GLfloat> vertices = {
        +0.5,   +0.5,   +0.0,
        -0.5,   +0.5,   +0.0,
        -0.5,   -0.5,   +0.0,
        +0.5,   -0.5,   +0.0
    };
    return vertices;
}

// Converts degrees to radians for rotation
float deg2rad(float d) {
    return (d*M_PI) / 180.0;
}

// Converts a vector to an array
GLfloat* vector2array(vector<GLfloat> vec) {
    GLfloat* arr = new GLfloat[vec.size()];
    for (int i = 0; i < vec.size(); i++) {
        arr[i] = vec[i];
    }
    return arr;
}

// Converts Cartesian coordinates to homogeneous coordinates
vector<GLfloat> to_homogeneous_coord(vector<GLfloat> cartesian_coords) {
    vector<GLfloat> result;
    for (int i = 0; i < cartesian_coords.size(); i++) {
        result.push_back(cartesian_coords[i]);
        if ((i+1) % 3 == 0) {
            result.push_back(1.0);
        }
    }
    return result;
}

// Converts Cartesian coordinates to homogeneous coordinates
vector<GLfloat> to_cartesian_coord(vector<GLfloat> homogeneous_coords) {
    vector<GLfloat> result;
    for (int i = 0; i < homogeneous_coords.size(); i++) {
        if ((i+1) % 4 == 0) {
            continue;
        } else {
            result.push_back(homogeneous_coords[i]);
        }
    }
    return result;
}

// Definition of a translation matrix
vector<GLfloat> translation_matrix (float dx, float dy, float dz) {
    vector<GLfloat> translate_mat = {
        1, 0, 0, dx,
        0, 1, 0, dy,
        0, 0, 1, dz,
        0, 0, 0, 1
    };
    
    return translate_mat;
}

// Definition of a scaling matrix
vector<GLfloat> scaling_matrix (float sx, float sy, float sz) {
    vector<GLfloat> scale_mat = {
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1
    };
    
    return scale_mat;
}

// Definition of a rotation matrix about the x-axis theta degrees
vector<GLfloat> rotation_matrix_x (float theta) {
    float radianTheta = deg2rad(theta);
    vector<GLfloat> rotate_mat_x = {
        1, 0, 0, 0,
        0, cos(radianTheta), -sin(radianTheta), 0,
        0, sin(radianTheta), cos(radianTheta), 0,
        0, 0, 0, 1
    };
    
    return rotate_mat_x;
}


// Definition of a rotation matrix about the y-axis by theta degrees
vector<GLfloat> rotation_matrix_y (float theta) {
    float radianTheta = deg2rad(theta);
    vector<GLfloat> rotate_mat_y = {
        cos(radianTheta), 0, sin(radianTheta), 0,
        0, 1, 0, 0,
        -sin(radianTheta), 0, cos(radianTheta), 0,
        0, 0, 0, 1
    };
    
    return rotate_mat_y;
}


// Definition of a rotation matrix about the z-axis by theta degrees
vector<GLfloat> rotation_matrix_z (float theta) {
    float radianTheta = deg2rad(theta);
    vector<GLfloat> rotate_mat_z = {
        cos(radianTheta), -sin(radianTheta), 0, 0,
        sin(radianTheta), cos(radianTheta), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    };
    
    return rotate_mat_z;
}

// Perform matrix multiplication for A B
vector<GLfloat> mat_mult(vector<GLfloat> A, vector<GLfloat> B) {
    vector<GLfloat> result;
    B = to_homogeneous_coord(B);
    for (int b = 0; b < B.size()/4; b++) {
        for (int a = 0; a < 4; a++) {
            float element_wise_sum = 0.0;
            for (int k = 0; k < 4; k++) {
                float element_wise = A[a*4+k]*B[b*4+k];
                if (element_wise < EPSILON && element_wise > -1.0*EPSILON) {
                    element_wise = 0.0;
                }
                element_wise_sum += element_wise;
            }
            result.push_back(element_wise_sum);
        }
    }
    return to_cartesian_coord(result);
}

// Builds a unit cube centered at the origin
vector<GLfloat> build_cube() {
    vector<GLfloat> result = {};
    vector<GLfloat> plane = init_plane();
    
    // create and rotate each plane
    vector<GLfloat> front_plane = plane;
    vector<GLfloat> back_plane = mat_mult(rotation_matrix_y(180.0), plane);
    vector<GLfloat> left_plane = mat_mult(rotation_matrix_y(-90.0), plane);
    vector<GLfloat> right_plane = mat_mult(rotation_matrix_y(90.0),plane);
    vector<GLfloat> top_plane = mat_mult(rotation_matrix_x(-90.0), plane);
    vector<GLfloat> bottom_plane = mat_mult(rotation_matrix_x(90.0), plane);
    
    // translate planes
    front_plane = mat_mult(translation_matrix(0, 0, 0.5), front_plane);
    back_plane = mat_mult(translation_matrix(0, 0, -0.5), back_plane);
    left_plane = mat_mult(translation_matrix(0.5, 0, 0), left_plane);
    right_plane = mat_mult(translation_matrix(-0.5, 0, 0), right_plane);
    top_plane = mat_mult(translation_matrix(0, 0.5, 0), top_plane);
    bottom_plane = mat_mult(translation_matrix(0, -0.5, 0), bottom_plane);
    
    // insert into result vector
    result.insert(result.end(), front_plane.begin(), front_plane.end());
    result.insert(result.end(), back_plane.begin(), back_plane.end());
    result.insert(result.end(), left_plane.begin(), left_plane.end());
    result.insert(result.end(), right_plane.begin(), right_plane.end());
    result.insert(result.end(), top_plane.begin(), top_plane.end());
    result.insert(result.end(), bottom_plane.begin(), bottom_plane.end());

    return result;
}

/**************************************************
 *            Camera and World Modeling           *
 *                                                *
 *  create a scene by applying transformations to *
 *  the objects built from planes and position    *
 *  the camera to view the scene by setting       *
 *  the projection/viewing matrices               *
 *                                                *
 *************************************************/

void setup() {
    // Enable the vertex array functionality
    glEnableClientState(GL_VERTEX_ARRAY);
    // Enable the color array functionality (so we can specify a color for each vertex)
    glEnableClientState(GL_COLOR_ARRAY);
    // Enable depth test
    glEnable(GL_DEPTH_TEST);
    // Accept fragment if it closer to the camera than the former one
    glDepthFunc(GL_LESS);
    // Set up some default base color
    glColor3f(0.5, 0.5, 0.5);
    // Set up white background
    glClearColor(1.0, 1.0, 1.0, 0.0);
}

void init_camera() {
    // Camera parameters
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    // Define a 50 degree field of view, 1:1 aspect ratio, near and far planes at 3 and 7
    gluPerspective(70.0, 1.0, 2.0, 10.0);
    // Position camera at (2, 3, 5), attention at (0, 0, 0), up at (0, 1, 0)
    gluLookAt(2.0, 6.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    
}

// Construct the scene using objects built from cubes/prisms
vector<GLfloat> init_scene() {
    vector<GLfloat> scene;
    
    // couch
    vector<GLfloat> couch_base = mat_mult(scaling_matrix(4, 0.5, 1.5), build_cube());
    couch_base = mat_mult(translation_matrix(0, -0.25, 0), couch_base);

    vector<GLfloat> left_couch_arm = mat_mult(scaling_matrix(0.25, 2, 1.5), build_cube());
    left_couch_arm = mat_mult(translation_matrix(-2, 0.5, 0), left_couch_arm);
    
    vector<GLfloat> right_couch_arm = mat_mult(scaling_matrix(0.25, 2, 1.5), build_cube());
    right_couch_arm = mat_mult(translation_matrix(2, 0.5, 0), right_couch_arm);
    
    vector<GLfloat> couch_back = mat_mult(scaling_matrix(4.25, 2.5, 0.5), build_cube());
    couch_back = mat_mult(translation_matrix(0, .5, -1.0), couch_back);
    
    vector<GLfloat> left_cushion = mat_mult(scaling_matrix(1.25, 0.75, 1.5), build_cube());
    left_cushion = mat_mult(translation_matrix(-1.25, .25, .25), left_cushion);
    
    vector<GLfloat> middle_cushion = mat_mult(scaling_matrix(1.25, 0.75, 1.5), build_cube());
    middle_cushion = mat_mult(translation_matrix(0, .25, .25), middle_cushion);
    
    vector<GLfloat> right_cushion = mat_mult(scaling_matrix(1.25, 0.75, 1.5), build_cube());
    right_cushion = mat_mult(translation_matrix(1.25, .25, .25), right_cushion);
    
    vector<GLfloat> back_left_cushion = mat_mult(scaling_matrix(1.25, 1.5, .5), build_cube());
    back_left_cushion = mat_mult(translation_matrix(-1.25, 1.25, -.5), back_left_cushion);
    
    vector<GLfloat> back_middle_cushion = mat_mult(scaling_matrix(1.25, 1.5, .5), build_cube());
    back_middle_cushion = mat_mult(translation_matrix(0, 1.25, -.5), back_middle_cushion);
    
    vector<GLfloat> back_right_cushion = mat_mult(scaling_matrix(1.25, 1.5, .5), build_cube());
    back_right_cushion = mat_mult(translation_matrix(1.25, 1.25, -.5), back_right_cushion);
    
    // coffee table
    vector<GLfloat> coffee_table = mat_mult(scaling_matrix(2, .1, 1), build_cube());
    coffee_table = mat_mult(translation_matrix(0, 0.5, 2), coffee_table);
    
    vector<GLfloat> coffee_table_leg_1 = mat_mult(scaling_matrix(.1, 1, .1), build_cube());
    coffee_table_leg_1 = mat_mult(translation_matrix(.75, 0, 2.25), coffee_table_leg_1);
    
    vector<GLfloat> coffee_table_leg_2 = mat_mult(scaling_matrix(.1, 1, .1), build_cube());
    coffee_table_leg_2 = mat_mult(translation_matrix(.75, 0, 1.75), coffee_table_leg_2);
    
    vector<GLfloat> coffee_table_leg_3 = mat_mult(scaling_matrix(.1, 1, .1), build_cube());
    coffee_table_leg_3 = mat_mult(translation_matrix(-.75, 0, 2.25), coffee_table_leg_3);
    
    vector<GLfloat> coffee_table_leg_4 = mat_mult(scaling_matrix(.1, 1, .1), build_cube());
    coffee_table_leg_4 = mat_mult(translation_matrix(-.75, 0, 1.75), coffee_table_leg_4);
  
    // side table
    vector<GLfloat> side_table = mat_mult(scaling_matrix(.75, .1, .75), build_cube());
    side_table = mat_mult(translation_matrix(2.75, .7, 0), side_table);
    
    vector<GLfloat> side_table_leg_1 = mat_mult(scaling_matrix(.1, 1.25, .1), build_cube());
    side_table_leg_1 = mat_mult(translation_matrix(2.5, 0, -.15), side_table_leg_1);
    
    vector<GLfloat> side_table_leg_2 = mat_mult(scaling_matrix(.1, 1.25, .1), build_cube());
    side_table_leg_2 = mat_mult(translation_matrix(2.5, 0, .15), side_table_leg_2);
    
    vector<GLfloat> side_table_leg_3 = mat_mult(scaling_matrix(.1, 1.25, .1), build_cube());
    side_table_leg_3 = mat_mult(translation_matrix(3, 0, -.15), side_table_leg_3);
    
    vector<GLfloat> side_table_leg_4 = mat_mult(scaling_matrix(.1, 1.25, .1), build_cube());
    side_table_leg_4 = mat_mult(translation_matrix(3, 0, .15), side_table_leg_4);
 
    // lamp
    vector<GLfloat> lamp_base = mat_mult(scaling_matrix(.1, 1.25, .1), build_cube());
    lamp_base = mat_mult(translation_matrix(2.75, 1.5, 0), lamp_base);
    
    vector<GLfloat> lamp_shade = mat_mult(scaling_matrix(.35, .5, .35), build_cube());
    lamp_shade = mat_mult(translation_matrix(2.75, 2, 0), lamp_shade);
    
    // insert into scene
    scene.insert(scene.end(), couch_base.begin(), couch_base.end());
    scene.insert(scene.end(), left_couch_arm.begin(), left_couch_arm.end());
    scene.insert(scene.end(), right_couch_arm.begin(), right_couch_arm.end());
    scene.insert(scene.end(), couch_back.begin(), couch_back.end());
    scene.insert(scene.end(), left_cushion.begin(), left_cushion.end());
    scene.insert(scene.end(), middle_cushion.begin(), middle_cushion.end());
    scene.insert(scene.end(), right_cushion.begin(), right_cushion.end());
    scene.insert(scene.end(), back_left_cushion.begin(), back_left_cushion.end());
    scene.insert(scene.end(), back_middle_cushion.begin(), back_middle_cushion.end());
    scene.insert(scene.end(), back_right_cushion.begin(), back_right_cushion.end());
    scene.insert(scene.end(), coffee_table.begin(), coffee_table.end());
    scene.insert(scene.end(), coffee_table_leg_1.begin(), coffee_table_leg_1.end());
    scene.insert(scene.end(), coffee_table_leg_2.begin(), coffee_table_leg_2.end());
    scene.insert(scene.end(), coffee_table_leg_3.begin(), coffee_table_leg_3.end());
    scene.insert(scene.end(), coffee_table_leg_4.begin(), coffee_table_leg_4.end());
    scene.insert(scene.end(), side_table.begin(), side_table.end());
    scene.insert(scene.end(), side_table_leg_1.begin(), side_table_leg_1.end());
    scene.insert(scene.end(), side_table_leg_2.begin(), side_table_leg_2.end());
    scene.insert(scene.end(), side_table_leg_3.begin(), side_table_leg_3.end());
    scene.insert(scene.end(), side_table_leg_4.begin(), side_table_leg_4.end());
    scene.insert(scene.end(), lamp_base.begin(), lamp_base.end());
    scene.insert(scene.end(), lamp_shade.begin(), lamp_shade.end());

    return scene;
}

// Construct the color mapping of the scene
vector<GLfloat> init_color(vector<GLfloat> scene) {
    vector<GLfloat> colors;
    for (int i = 0; i < scene.size(); i++) {
        colors.push_back(static_cast<float>(rand()) / static_cast<float>(RAND_MAX));
    }
    return colors;
}

void display_func() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    
    // rotate scene
    GLfloat* scene_vertices = vector2array(mat_mult(rotation_matrix_y(THETA), SCENE));
    GLfloat* color_vertices = vector2array(COLOR);
    // Pass the scene vertex pointer
    glVertexPointer(3,                // 3 components (x, y, z)
                    GL_FLOAT,         // Vertex type is GL_FLOAT
                    0,                // Start position in referenced memory
                    scene_vertices);  // Pointer to memory location to read from
    
    // Pass the color vertex pointer
    glColorPointer(3,                   // 3 components (r, g, b)
                   GL_FLOAT,            // Vertex type is GL_FLOAT
                   0,                   // Start position in referenced memory
                   color_vertices);     // Pointer to memory location to read from
    
    // Draw quad point planes: each 4 vertices
    glDrawArrays(GL_QUADS, 0, 4 * init_scene().size() / 12.0);
    
    glFlush();            //Finish rendering
    glutSwapBuffers();
}

void idle_func() {
    THETA = THETA + 0.3;
    display_func();
}

int main (int argc, char **argv) {
    // Initialize GLUT
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_RGB | GLUT_DOUBLE | GLUT_DEPTH);
    glutInitWindowSize(800, 600);
    // Create a window with rendering context and everything else we need
    glutCreateWindow("Assignment 3");
    
    setup();
    init_camera();
    // Setting global variables SCENE and COLOR with actual values
    SCENE = init_scene();
    COLOR = init_color(SCENE);
    
    // Set up our display function
    glutDisplayFunc(display_func);
    glutIdleFunc(idle_func);
    // Render our world
    glutMainLoop();
    
    // Remember to call "delete" on your dynmically allocated arrays
    // such that you don't suffer from memory leaks. e.g.
    // delete arr;
    
    return 0;
}

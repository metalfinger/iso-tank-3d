# ISO Tank 3D Project Documentation

## Project Overview

This project is a 3D visualization of an ISO Tank (Intermodal Standard Organization Tank Container) using Three.js. It features an interactive 3D model with component exploration capabilities, animation controls, and a timeline-based interface for examining different parts of the tank.

## Project Structure

```
iso-tank-3d/
├── index.html                 # Main HTML file
├── script.js                  # Main JavaScript application logic
├── script copy.js             # Backup copy of the script (older version)
├── .vscode/                   # VS Code settings
│   └── settings.json          # VS Code configuration
├── alm/                       # PBR (Physically Based Rendering) textures
│   ├── basecolor.png          # Base color/albedo texture
│   ├── metallic.png           # Metallic texture map
│   ├── normal.png             # Normal map texture
│   └── roughness.png          # Roughness texture map
├── hdri/                      # High Dynamic Range Imaging environment maps
│   └── kloofendal_48d_partly_cloudy_puresky_4k.hdr  # Sky environment map
├── images/                    # General image assets
│   ├── Deccan.svg             # SVG logo
│   ├── floor.png              # Floor texture
│   ├── GSG_SI_Scratches_04.jpg # Scratch texture for materials
│   └── logo.png               # Company logo
├── models/                    # 3D models directory
│   └── ISO TANK Animated_03-06-25/  # Main model folder
│       └── obj/               # OBJ format models
│           ├── box_frame_final.mtl  # Material file for box frame
│           ├── box_frame_final.obj  # Box frame model
│           ├── frame_final.mtl      # Material file for frame
│           ├── frame_final.obj      # Frame model
│           ├── ring_final.mtl       # Material file for rings
│           ├── ring_final.obj       # Rings model
│           ├── rings.mtl            # Material file for rings (alternative)
│           └── rings.obj            # Rings model (alternative)
└── script/                    # Three.js library files
    ├── GLTFLoader.js          # GLTF model loader
    ├── OBJLoader.js           # OBJ model loader
    ├── OrbitControls.js       # Camera controls
    ├── RGBELoader.js          # HDR image loader
    └── three.js               # Main Three.js library
```

## File Descriptions

### Root Directory Files

#### `index.html`
The main HTML file that sets up the web page structure. It includes:
- A responsive layout with dark theme styling
- A timeline component display at the top
- A logo display at the bottom left
- Loading overlay with progress bar
- Links to all required JavaScript libraries
- CSS styling for UI elements including:
  - Timeline component cards with hover effects
  - Loading screen with progress indicator
  - Responsive controls and buttons

#### `script.js`
The main application JavaScript file containing all the Three.js logic:
- Scene setup with camera, renderer, and lighting
- HDR environment mapping for realistic reflections
- Multiple light sources (ambient, directional, hemisphere)
- Loading and configuration of multiple 3D models
- Animation system with frame-by-frame control
- Component timeline interface for exploring tank parts
- Interactive controls for user interaction
- Auto-rotation feature when user is inactive
- Detailed loading progress tracking

#### `script copy.js`
An older version of the main script with a simpler implementation:
- Basic scene setup with camera, renderer, lighting
- Single GLTF model loading
- Ping-pong animation loop
- Basic floor with grid texture
- Simplified controls

### alm/ Folder
Contains PBR (Physically Based Rendering) material textures:
- `basecolor.png`: The base color (albedo) texture that defines the surface color
- `metallic.png`: Defines which parts of the surface are metallic
- `normal.png`: Normal map for adding surface detail without geometry
- `roughness.png`: Controls how rough or smooth the surface appears

### hdri/ Folder
Contains environment maps for realistic lighting:
- `kloofendal_48d_partly_cloudy_puresky_4k.hdr`: A high-resolution HDR sky environment that provides realistic reflections and lighting to the scene

### images/ Folder
Contains various image assets used in the project:
- `Deccan.svg`: An SVG format logo
- `floor.png`: A grid texture used for the floor surface
- `GSG_SI_Scratches_04.jpg`: A scratch texture used for material detail
- `logo.png`: A company logo displayed in the bottom left corner

### models/ Folder
Contains the 3D models for the ISO tank visualization:
- `ISO TANK Animated_03-06-25/obj/`: Folder containing OBJ format models
  - `box_frame_final.obj/.mtl`: The box frame component of the tank
  - `frame_final.obj/.mtl`: The main frame structure
  - `ring_final.obj/.mtl`: Stiffening rings for the tank
  - `rings.obj/.mtl`: Alternative rings model

### script/ Folder
Contains the Three.js library and its extensions:
- `three.js`: The main Three.js library
- `GLTFLoader.js`: Loader for GLTF format 3D models
- `OBJLoader.js`: Loader for OBJ format 3D models
- `OrbitControls.js`: Camera controls for user interaction
- `RGBELoader.js`: Loader for HDR environment maps

## Application Features

### 3D Visualization
- Real-time rendered 3D ISO tank model
- Physically based rendering for realistic materials
- HDR environment mapping for reflections
- Dynamic lighting with shadows
- Smooth camera controls with orbit functionality

### Animation System
- Frame-by-frame animation control
- Component timeline for exploring tank parts
- Smooth animation transitions with easing
- Adaptive animation speed based on distance
- Stuck frame detection and recovery

### Component Timeline
The application features a timeline interface showing different components of the ISO tank:
1. Tank Barrel Cylinder Section (Frame 51)
2. Tank Barrel Dome Ends (Frame 71)
3. Tank Barrel Vacuum Stiffening Rings (Frame 114)
4. Steam Tube Heating System (Frame 141)
5. Valve & Manlid Mounting Flanges (Frame 180)
6. Tank Barrel Insulation (Frame 260)
7. Tank Barrel to Frame Mounting Collars (Frame 325)
8. Valve Compartments & Drain Hose Sets (Frame 372)
9. External Cladding & Strap Set (Frame 440)
10. Tank Support Frame & Corner Castings (Frame 500)
11. Top Access Walkway Set (Frame 540)
12. Valves, Man Lid & Monitoring Components (Frame 660)

### User Interface
- Loading screen with detailed progress tracking
- Interactive timeline component cards
- Auto-rotation when user is inactive
- "Explore Our Tanks" message during auto-rotation
- Responsive design for different screen sizes

### Technical Implementation

#### Scene Setup
- Perspective camera with 75° field of view
- WebGL renderer with antialiasing and logarithmic depth buffer
- ACES Filmic tone mapping for realistic colors
- Shadow mapping with PCF soft shadows

#### Lighting
- Ambient light (40% intensity)
- Primary directional light (150% intensity) with shadows
- Secondary directional light (80% intensity)
- Hemisphere light (60% intensity) for ambient occlusion

#### Models
- Main GLB model loaded from external URL
- Additional OBJ models for specific components:
  - Stiffening rings (appears at frame 115)
  - Frame structure (appears at frame 270)
  - Box frame (appears at frame 460)

#### Textures
- Floor grid texture with repeat wrapping
- Scratch textures for material detail
- HDR environment map for reflections
- PBR texture set (basecolor, metallic, normal, roughness)

## How It Works

1. **Initialization**: The application sets up the Three.js scene, camera, renderer, and lighting system.

2. **Asset Loading**: Multiple 3D models are loaded simultaneously with progress tracking:
   - Main GLB model from external source
   - Additional OBJ models for specific components
   - HDR environment map
   - Texture assets

3. **Scene Composition**: Loaded models are added to the scene with proper materials and positioning.

4. **Animation Setup**: The main model's animation is configured for frame-by-frame control rather than continuous playback.

5. **UI Creation**: Component timeline cards are generated dynamically based on predefined data.

6. **Rendering Loop**: The application enters a continuous render loop that:
   - Updates camera controls
   - Updates animation mixer
   - Checks for target frame completion
   - Handles special animations for component models
   - Renders the scene

7. **User Interaction**: 
   - Timeline component cards allow jumping to specific frames
   - Orbit controls enable camera movement
   - Inactivity detection triggers auto-rotation

## Development Setup

1. Serve the project directory through a local web server (due to CORS restrictions with file loading)
2. Access `index.html` through the browser
3. The application will automatically load all assets and start the visualization

## Customization

### Adding New Components
To add new components to the timeline:
1. Add entries to the `componentTimelineData` array in `script.js`
2. Specify frame number, component name, and description
3. The UI will automatically update to include the new component

### Modifying Animations
To adjust animation behavior:
1. Modify frame numbers in the animation functions
2. Adjust timing parameters for component appearances
3. Change easing functions for smoother transitions

### Updating Models
To use different 3D models:
1. Replace model files in the `models/` directory
2. Update loader paths in `script.js`
3. Adjust material properties as needed

## Performance Considerations

- The application uses logarithmic depth buffer to handle large scenes
- Texture anisotropy is set to maximum for better quality
- Polygon offset is used to reduce z-fighting artifacts
- Adaptive animation speed optimizes performance for long transitions
- Stuck frame detection prevents animation from hanging

## Browser Compatibility

The application requires a modern browser with WebGL support:
- Chrome 50+
- Firefox 45+
- Safari 10+
- Edge 79+

## Known Limitations

- Models are loaded from external sources which may affect loading times
- Heavy use of 3D graphics may impact performance on older devices
- Some mobile browsers may have compatibility issues with advanced WebGL features

## Future Improvements

1. Implement local model storage to reduce dependency on external sources
2. Add more detailed component information and specifications
3. Implement model interaction (click to highlight components)
4. Add measurement tools for technical specifications
5. Include multiple tank models for comparison
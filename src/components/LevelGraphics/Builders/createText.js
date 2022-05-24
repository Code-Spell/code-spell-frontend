import * as THREE from "three";

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export const createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor) => {
    
    const all = new THREE.Group();
    
    var fontloader = new FontLoader();
    fontloader.load( '/fonts/roboto_regular.typeface.json', function ( font ) {

        var textGeo = new TextGeometry( text, {
            font: font,
            size: fontSize,
            height: 0,
        } );


    var final = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial( { color: textColor } ) );
    
    textGeo.computeBoundingBox();
    const center = textGeo.boundingBox.getCenter(new THREE.Vector3());
    const size = textGeo.boundingBox.getSize(new THREE.Vector3());
    
    final.position.set( -center.x, 6, 0.7 );
    all.add(final);
            
    
    if (hasSpeechBubble == true){

        const box_color = new THREE.MeshBasicMaterial( {color: bubbleColor});
        
            // speech bubble
        const speech = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.5, size.x+1 ), box_color);
        speech.rotateY( - Math.PI / 2 );
        speech.position.set( 0, 6.2, 0 ) // scale here
        all.add(speech)
    
        if (hasTri == true){
            const shape = new THREE.Shape();
    
            shape.moveTo( -0.6, 0 );
            shape.lineTo( 0.6, 0 );
            shape.lineTo( 0, 0.8 );
            
            const tri = new THREE.Mesh( new THREE.ShapeGeometry(shape), box_color);
            tri.rotateZ(Math.PI);
            tri.position.set( 0, 5.6, 0 ) // scale here
            all.add(tri)
        }
    }

    } );

    
    all.position.set(0,0,0)
    return all;
   
}
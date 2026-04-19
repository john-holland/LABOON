import tensorflow as tf
import numpy as np
from tensorflow.keras import layers, models
import os
import json

def create_model():
    # Create a model for detecting motion and objects in video frames
    model = models.Sequential([
        # Input layer
        layers.Input(shape=(480, 854, 3)),
        
        # Convolutional layers for feature extraction
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        # Flatten and dense layers
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        
        # Output layers
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(32, activation='relu'),
        layers.Dense(4, activation='sigmoid')  # [motion, impact, flash, special]
    ])
    
    return model

def compile_model(model):
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

def save_model(model, output_dir='./models/object_detection'):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Save model architecture and weights
    model.save(f'{output_dir}/model.h5')
    
    # Save model configuration
    model_config = {
        'input_shape': (480, 854, 3),
        'output_classes': ['motion', 'impact', 'flash', 'special'],
        'model_type': 'sequential',
        'layers': [
            {'type': 'conv2d', 'filters': 32, 'kernel_size': 3},
            {'type': 'maxpool2d', 'pool_size': 2},
            {'type': 'conv2d', 'filters': 64, 'kernel_size': 3},
            {'type': 'maxpool2d', 'pool_size': 2},
            {'type': 'conv2d', 'filters': 128, 'kernel_size': 3},
            {'type': 'maxpool2d', 'pool_size': 2},
            {'type': 'dense', 'units': 512},
            {'type': 'dense', 'units': 256},
            {'type': 'dense', 'units': 128},
            {'type': 'dense', 'units': 64},
            {'type': 'dense', 'units': 32},
            {'type': 'dense', 'units': 4}
        ]
    }
    
    with open(f'{output_dir}/model_config.json', 'w') as f:
        json.dump(model_config, f, indent=2)

def main():
    print("Creating and compiling model...")
    model = create_model()
    model = compile_model(model)
    
    print("Saving model...")
    save_model(model)
    
    print("Model setup complete!")
    print("Model saved to ./models/object_detection/")

if __name__ == "__main__":
    main() 

---
slug: siamese-network-one-shot-face-recognition
title: How I Built One-Shot Face Recognition with a Siamese Network
authors: yash
tags: [machine-learning, computer-vision, tensorflow, deep-learning]
description: A practical explanation of Siamese Networks for one-shot facial recognition.
---

Face recognition is often introduced as a classification problem: give the model enough examples of each person, then ask it to predict the identity. That works when there are many labeled images for every person.

<!-- truncate -->

But real applications often do not have that luxury. A door access system, device unlock flow, or small verification tool may only have one reference image. That is where a Siamese Network becomes useful.

## Learning similarity instead of labels

A Siamese Network does not simply classify an image into one of many identities. It learns whether two images are similar.

The model receives two face images and produces embeddings for both. Then a distance layer compares those embeddings. If the images belong to the same person, the distance should be small. If they belong to different people, the distance should be larger.

This makes the model more flexible than a fixed classifier because it can compare new identities without retraining the entire final layer.

## The architecture I used

The project used input images of size 105 x 105 x 3. The network included convolutional layers, max-pooling layers, an L1 distance layer, a fully connected layer, and a sigmoid output.

The overall flow looked like this:

1. Pass image A through the CNN branch.
2. Pass image B through the same CNN branch with shared weights.
3. Compare both embeddings using an L1 distance layer.
4. Predict whether both images represent the same identity.

The shared-weight design is the key idea. Both images go through the same feature extractor, so the model learns a common embedding space.

## Dataset and training

I used the Labeled Faces in the Wild dataset, which contains more than 13,000 face images. The important part was not only the image count, but how pairs were created.

A Siamese Network needs positive pairs and negative pairs.

- Positive pairs contain two images of the same person.
- Negative pairs contain images of different people.

That pairing strategy teaches the model what similarity and difference look like.

## Practical improvements

Two improvements had a strong effect on the project.

First, data augmentation helped the network generalize better. Small variations in lighting, cropping, and face positioning make the task closer to real-world recognition.

Second, optimizing the data pipeline reduced training time. In computer vision projects, the model is only one part of performance. Loading, resizing, pairing, and batching images efficiently can make a noticeable difference.

## Where this approach fits

Siamese Networks are useful when the system needs verification rather than large-scale identity classification.

Good fits include:

- Small access-control systems
- Personal device authentication
- CCTV-assisted verification
- Low-data identity matching

The project reached 98% accuracy in evaluation and gave me a stronger understanding of how metric learning can solve practical computer vision problems with limited examples.

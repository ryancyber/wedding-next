"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [threeLoaded, setThreeLoaded] = useState(false);

    useEffect(() => {
        if (!threeLoaded || !containerRef.current) return;

        // @ts-ignore
        const THREE = window.THREE;
        if (!THREE) return;

        // Setup Scene
        const scene = new THREE.Scene();
        
        // Menggunakan ukuran container, bukan window, agar pas di dalam div
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        
        // Membersihkan canvas sebelumnya (berguna saat Hot Reload di Next.js)
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);

        // Menambahkan Cahaya (Penting untuk MeshStandardMaterial)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Cahaya merata
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Cahaya terarah untuk pantulan emas
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Load Tekstur (Gunakan path file gambar Anda)
        const loader = new THREE.TextureLoader();
        const texture = loader.load('elegant-burgundy-ornamented-template-with-golden.avif');

        // Buat Plane (Sesuaikan aspek rasio gambar, misal 2:1)
        const geometry = new THREE.PlaneGeometry(4, 2);
        
        // Menggunakan MeshStandardMaterial untuk menjaga kualitas warna burgundy dan emasnya
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            transparent: true,
            roughness: 0.2, // Rendah agar terlihat lebih halus/mengkilap
            metalness: 0.8  // Tinggi untuk memberikan efek emas/metalik yang elegan
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        camera.position.z = 3;

        // Menambahkan Efek Border Bergerak (Glow/Pulse)
        let animationFrameId: number;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            // Animasi skala kecil untuk efek "bernafas"
            const time = Date.now() * 0.002;
            plane.scale.x = 1 + Math.sin(time) * 0.01;
            plane.scale.y = 1 + Math.sin(time) * 0.01;

            // Memanipulasi posisi cahaya agar memberikan kesan kilauan dinamis/berjalan pada warna emas
            directionalLight.position.x = Math.sin(time * 0.5) * 5;
            directionalLight.position.z = 5 + Math.cos(time * 0.5) * 2;
            
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function saat komponen di-unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [threeLoaded]);

    return (
        <>
            <div ref={containerRef} id="container" style={{ width: "100%", height: "500px" }}></div>
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
                onLoad={() => setThreeLoaded(true)}
            />
        </>
    );
}